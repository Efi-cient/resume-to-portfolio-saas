# Portfolio User Guide & Deployment Strategy

## 1. How to Input Your CV
Your portfolio is powered by a structured data file, not a CMS. This ensures maximum performance and complete control over the design.

**File Location:** `data/resume.json`

### Workflow
1.  **Open** the file `data/resume.json`.
2.  **Edit** the fields directly:
    -   `"name"`, `"title"`, `"tagline"`: Updates the Hero section.
    -   `"ticker"`: Updates the scrolling marquee.
    -   `"skills"`: Populates the Bento Grid capability matrix.
    -   `"projects"`: Controls the Case Study deck.
3.  **Save** the file. The site updates instantly in development mode.

**Alternative:** You can paste your raw CV text into our chat, and I will structure it into the JSON format for you automatically.

---

## 2. Design Strategy & Templates
Unlike generic website builders (Squarespace, Wix), this is a **Bespoke Codebase**. There are no pre-baked "templates" to pick from. Instead, the design is procedurally generated based on your persona.

### My Recommendation Logic (The "AI Designer")
I analyze your role and industry to determine the aesthetic "gravity":

| Persona | Aesthetic Gravity | Typography | Motion Physics |
| :--- | :--- | :--- | :--- |
| **Executive (Current)** | "Corporate Ethereal" | Swiss / Grotesque | Heavy, Damped (Luxury Car Door) |
| **Creative Coder** | "Cyberpunk / Glitch" | Monospace / Pixel | Snappy, High Velocity |
| **Venture Capital** | "Old Money / Print" | Serif / Editorial | Static, Fade-in Only |

**To Change the Design:**
Simply ask me. Example: *"Refactor the design to look more like a brutalist art gallery."* I will rewrite the Tailwind classes and Framer Motion variants to match.

---

## 3. Hosting & Custom Domain
We will use **Vercel** for hosting. It is the industry standard for Next.js, offering "Edge Network" speed (making your site load instantly worldwide).

### Step-by-Step Deployment
1.  **Push to GitHub**:
    -   Initialize a git repo: `git init`, `git add .`, `git commit -m "Initial commit"`.
    -   Create a repo on GitHub and push.
2.  **Connect to Vercel**:
    -   Go to [Vercel.com](https://vercel.com) and sign up.
    -   Click "Add New Project" -> "Import from GitHub".
    -   Select your repository (`port1`).
    -   Click **Deploy**.
3.  **Custom Key Configuration (The "Authority" Move)**:
    -   On Vercel, go to **Settings > Domains**.
    -   Add your domain (e.g., `alexsterling.com`).
    -   Vercel will give you DNS records (A Record / CNAME) to add to your domain registrar (GoDaddy, Namecheap, etc.).
    -   **Result**: Automatic SSL (HTTPS) and global CDN caching.

### Cost
-   **Hosting**: Free (Hobby Tier)
-   **Domain**: ~$10-20/year (purchased separately)
