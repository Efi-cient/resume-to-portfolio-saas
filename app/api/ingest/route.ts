import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
const pdf = require("pdf-parse/lib/pdf-parse.js");
import mammoth from "mammoth";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());
        let text = "";

        if (file.type === "application/pdf") {
            const data = await pdf(buffer);
            text = data.text;
        } else if (
            file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
            file.type === "application/msword"
        ) {
            const result = await mammoth.extractRawText({ buffer });
            text = result.value;
        } else {
            return NextResponse.json({ error: "Unsupported file type" }, { status: 400 });
        }

        const structuredData = parseResumeText(text);

        return NextResponse.json(structuredData);
    } catch (error) {
        console.error("Error processing file:", error);
        return NextResponse.json({ error: "Failed to process file" }, { status: 500 });
    }
}

function parseResumeText(text: string) {
    // Normalize text
    const cleanText = text.replace(/\s+/g, " ").trim();
    const lines = text.split('\n').filter(line => line.trim().length > 0);

    // 1. EXTRACT EMAIL
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi;
    const emails = text.match(emailRegex);
    const email = emails ? emails[0] : "";

    // 2. EXTRACT PHONE
    // Matches common formats: (123) 456-7890, 123-456-7890, +1 123 456 7890
    const phoneRegex = /(\+?\d{1,3}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}/gi;
    const phones = text.match(phoneRegex);
    const phone = phones ? phones.find(p => p.length > 9) || "" : "";

    // 3. EXTRACT SOCIALS / LINKS
    const socialRegex = /((https?:\/\/)?(www\.)?(linkedin\.com|github\.com|twitter\.com|x\.com)\/[^\s]+)/gi;
    const socialsFound = text.match(socialRegex) || [];
    const socials = socialsFound.map(url => {
        let label = "Link";
        if (url.includes("linkedin")) label = "LinkedIn";
        if (url.includes("github")) label = "GitHub";
        if (url.includes("twitter") || url.includes("x.com")) label = "Twitter";

        // Ensure standard URL format
        let cleanUrl = url.trim();
        if (!cleanUrl.startsWith("http")) cleanUrl = "https://" + cleanUrl;

        return { label, url: cleanUrl };
    });

    // 4. EXTRACT ADDRESS (Heuristic)
    // Look for patterns like "City, State Zip" or just "City, State"
    // This is tricky without NLP, so we'll look for lines with 2 capitalized words and a comma, or zip codes
    let address = "";
    const addressRegex = /([A-Z][a-z]+,\s[A-Z]{2}(\s\d{5})?)/;
    for (const line of lines.slice(0, 10)) { // Usually at top
        if (addressRegex.test(line) && !emailRegex.test(line) && !socialRegex.test(line)) {
            const match = line.match(addressRegex);
            if (match) {
                address = match[0];
                break;
            }
        }
    }

    // 5. EXTRACT NAME
    // Heuristic: Name is usually top lines, exclude lines that are just emails or links or phone
    let name = "Your Name";
    for (const line of lines) {
        const cleanLine = line.trim();
        // Skip if line is just an email or link or phone
        if (emailRegex.test(cleanLine) || socialRegex.test(cleanLine) || phoneRegex.test(cleanLine)) continue;

        // Simple heuristic: 2-4 words, mostly letters
        if (cleanLine.length > 2 && cleanLine.length < 30 && /^[a-zA-Z\s]+$/.test(cleanLine)) {
            name = cleanLine;
            break;
        }
    }

    // 6. GENERATE TAGLINE
    // Find a line that looks like a summary (longer than name, not a contact info)
    let tagline = `Professional with experience in industry.`;
    for (const line of lines) {
        const cleanLine = line.trim();
        if (cleanLine.length > 40 && cleanLine.length < 200 && !emailRegex.test(cleanLine) && !socialRegex.test(cleanLine) && !phoneRegex.test(cleanLine)) {
            tagline = cleanLine;
            break;
        }
    }

    // 7. GENERATE PROJECTS FROM EXPERIENCE
    // Look for "Experience" or "History" section
    const expIndex = lines.findIndex(l => /experience|work history|employment/i.test(l));
    let projectDesc = "Extracted from CV...";
    if (expIndex !== -1) {
        // Grab the next few lines
        projectDesc = lines.slice(expIndex + 1, expIndex + 6).join(" ").slice(0, 300) + "...";
    }

    const projects = [
        {
            id: "1",
            title: "Recent Experience",
            role: "Professional",
            metric: "Key Contributor",
            description: projectDesc || "Detailed work experience extracted from your uploaded CV."
        }
    ];

    return {
        name: name,
        title: "Product Leader",
        tagline: tagline,
        ticker: ["Strategic Vision", "Revenue Growth", "Team Leadership", "Innovation"],
        contact: {
            email: email,
            phone: phone,
            address: address,
            socials: socials
        },
        skills: {
            strategic: ["Product Strategy", "Market Analysis", "Roadmapping"],
            technical: ["Data Analysis", "Project Management", "Agile"],
            leadership: ["Team Building", "Mentorship", "Stakeholder Mgmt"]
        },
        projects: projects
    };
}
