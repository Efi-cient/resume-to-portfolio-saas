import { NextRequest, NextResponse } from "next/server";
// @ts-ignore
import pdf from "pdf-parse";
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

    // Heuristic: Name is usually the first few words found
    // We look for the first line that looks like a name (letters, not too long)
    const lines = text.split('\n').filter(line => line.trim().length > 0);
    let name = "Your Name";
    for (const line of lines) {
        const cleanLine = line.trim();
        // Simple heuristic: 2-4 words, mostly letters
        if (cleanLine.length > 2 && cleanLine.length < 30 && /^[a-zA-Z\s]+$/.test(cleanLine)) {
            name = cleanLine;
            break;
        }
    }

    // Generate some projects based on text chunks if possible, else default
    // This is a simulation of "AI Extraction" without an actual LLM
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
        tagline: `Professional with experience in ${lines[5]?.slice(0, 20) || "industry"}.`,
        ticker: ["Strategic Vision", "Revenue Growth", "Team Leadership", "Innovation"],
        skills: {
            strategic: ["Product Strategy", "Market Analysis", "Roadmapping"],
            technical: ["Data Analysis", "Project Management", "Agile"],
            leadership: ["Team Building", "Mentorship", "Stakeholder Mgmt"]
        },
        projects: projects
    };
}
