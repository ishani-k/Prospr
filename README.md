# Prospr - Smart Expense Tracker  

**Prospr** is an intelligent expense tracking app that helps users **manage their finances efficiently**.  
It allows users to record, edit, filter, and delete transactions, set **budget goals**, scan **receipts using AI**, and receive **alerts via email** when nearing budget limits.  
With **visual financial insights and monthly analytics**, Prospr empowers users to spend wisely and save smarter.


## Overview  
Prospr is built to simplify personal finance management through **automation, AI insights, and modern UI**.  
From **tracking daily expenses** to **analyzing monthly trends**, the app ensures users stay aware of their spending habits and make data-driven financial decisions — all in a seamless experience powered by Next.js.


## Tech Stack  

- Full Stack Framework: Next.js (Frontend + Backend)
- UI Components: Shadcn/UI, Tailwind CSS
- Database: PostgreSQL (via Supabase)
- ORM: Prisma ORM
- Event Handling: Inngest
- AI Integration: Gemini API (for receipt scanning & insights)
- Charts & Visuals: Recharts
- Hosting: Vercel


## Features  
- **Expense Tracking:** Add, edit, filter, and delete transactions easily.  
- **Budget Goals:** Set monthly budget goals.  
- **AI Receipt Scanner:** Scan and extract expense details using Gemini API.  
- **Visual Insights:** Interactive graphs showing income vs. expenses, categroy-wise expenses.  
- **Email Alerts:** Automated alerts when budget thresholds are reached.  
- **Monthly Reports:** Smart summaries for financial insights.  
- **Transaction Management:** Category-based organization and filters.  


## Screenshots *(optional)*  
You can include images or mockups like:  



---

## Installation & Setup  
Follow these steps to run Prospr locally:

```bash
# Clone the repository
git clone https://github.com/yourusername/prospr.git

# Navigate to the project directory
cd prospr

# Install dependencies
npm install

# Set up environment variables
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=
NEXT_PUBLIC_CLERK_SIGN_UP_URL=
# Connect to Supabase via connection pooling
DATABASE_URL=
# Direct connection to the database. Used for migrations
DIRECT_URL=
RESEND_API_KEY=
GEMINI_API_KEY=

# Run database migrations
npx prisma migrate dev

# Start the development server
npm run dev
```
Then open http://localhost:3000 in your browser.

## How It Works

  - Add transactions manually or upload receipts for AI-based extraction.
  - Set budget goals for custom timeframes or categories.
  - Prospr tracks spending in real time and logs events through Inngest.
  - Email alerts are triggered automatically when nearing budget limits.
  - Recharts visualizes spending insights in an interactive dashboard.

##  Future Enhancements
- Integration with bank APIs for auto-importing expenses
- Export reports as PDFs or Excel files
- Dark mode UI
-  AI-based saving and investment suggestions

## Developer
Ishani Kundu
[LinkedIn](https://www.linkedin.com/in/ishani-kundu11/)


