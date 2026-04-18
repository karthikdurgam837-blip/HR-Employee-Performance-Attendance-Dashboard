# 📊 HR Personnel Analytics Workbench

A production-grade HR data workbench designed for professional analysts to monitor personnel performance, attendance trends, and capital expenditure ROI. This project bridges the gap between raw datasets and strategic organizational insights using advanced visualization and AI instrumentation.

![Workbench Preview](https://picsum.photos/seed/hr-workbench/1200/600)

## 🎯 Executive Summary

Managing large workforce datasets requires precision. The **HR Personnel Analytics Workbench** provides a structured environment to:
- Correlate **Salary vs Performance** to identify high-ROI individuals.
- Monitor **Attendance Distribution** across departments and locations.
- Leverage **Gemini AI** for automated qualitative synthesis of quantitative trends.
- Flag **Critical Risks** based on statistical anomalies in performance and attendance.

## 🚀 Key Modules

### 1. ROI Correlation Matrix (Technical Instrument)
A high-contrast scatter plot built with Recharts, optimized for identifying outliers in the performance-to-pay ratio. Featuring neon data points and precision crosshairs for deep-dive analysis.

### 2. Strategy Engine (Gemini AI)
Integrated AI analysis module that processes current filtered datasets to provide real-time strategic recommendations for HR leadership.

### 3. Personnel Risk Monitor
A structural log that identifies employees requiring management intervention, allowing for high-accuracy personnel support.

### 4. Technical Bench Guide
An interactive manual documenting the Excel logic (formulas, pivots, data cleaning) required to replicate this enterprise-level system in traditional spreadsheet environments.

## 🛠️ Technical Specifications

- **Frontend:** React 18 / TypeScript
- **Styling:** Tailwind CSS (Workbench Aesthetic)
- **Intelligence:** Google Gemini AI API
- **Visualization:** Recharts (SVG)
- **Icons:** Lucide React
- **Animation:** Framer Motion (Structural transitions)

## 📥 Installation & Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/hr-personnel-workbench.git
   cd hr-personnel-workbench
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Environment Configuration:**
   Create a `.env` file and add your Gemini API Key:
   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

4. **Run Development Server:**
   ```bash
   npm run dev
   ```

## 📂 Project Architecture

```text
src/
├── components/     # Structural UI Views
├── lib/            # Utilities (cn, theme helpers)
├── services/       # AI & API integrations
├── types/          # Personnel Data Schemas
└── utils/          # Dataset Synthesis Logic
```

## 📄 License

This project is licensed under the Apache-2.0 License.

---
*Developed for the intersection of Human Capital and Statistical Precision.*
