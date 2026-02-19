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

    // 2. EXTRACT SOCIALS / LINKS
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

    // 3. EXTRACT NAME
    // Heuristic: Name is usually top lines, exclude lines that are just emails or links
    let name = "Your Name";
    for (const line of lines) {
        const cleanLine = line.trim();
        // Skip if line is just an email or link
        if (emailRegex.test(cleanLine) || socialRegex.test(cleanLine)) continue;

        // Simple heuristic: 2-4 words, mostly letters
        if (cleanLine.length > 2 && cleanLine.length < 30 && /^[a-zA-Z\s]+$/.test(cleanLine)) {
            name = cleanLine;
            break;
        }
    }

    // 4. GENERATE TAGLINE
    // Find a line that looks like a summary (longer than name, not a contact info)
    let tagline = `Professional with experience in industry.`;
    for (const line of lines) {
        const cleanLine = line.trim();
        if (cleanLine.length > 40 && cleanLine.length < 200 && !emailRegex.test(cleanLine) && !socialRegex.test(cleanLine)) {
            tagline = cleanLine;
            break;
        }
    }


    // 5. GENERATE PROJECTS (Simulation)
    const projects = [
        {
            id: "1",
            title: "Strategic Initiative",
            role: "Lead",
            metric: "Key Driver",
            description: "Extracted from CV: " + cleanText.slice(0, 100) + "..."
        }
    ];

    return {
        name: name,
        title: "Product Leader",
        tagline: tagline,
        ticker: ["Strategic Vision", "Revenue Growth", "Team Leadership", "Innovation"],
        contact: {
            email: email,
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
