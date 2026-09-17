# MISSION PROMPT: Build Digital Presence Evaluation & Lead Generation System

You are an expert full-stack developer specializing in **Laravel 11**, **Inertia.js** (React), and **FilamentPHP v3**. Build a complete **Interactive Digital Presence Diagnostic & Lead Generation System**.

This application serves as a high-converting diagnostic funnel that captures client leads, scores their digital marketing maturity, and delivers tailored diagnostic reports across 4 distinct tracks.

---

## 1. TECH STACK & ARCHITECTURE REQUIREMENTS

- **Backend Framework:** Laravel 11.x (PHP 8.3+)
- **Frontend Stack:** Inertia.js with React + Tailwind CSS
- **Architecture Pattern:**
  - Controller Layer: Inertia Controllers handling page renders and API form submissions.
  - Domain Service Layer: Dedicated `AssessmentDiagnosticService` handling score calculation, foundation state overrides, diagnostic tier matching, and report generation.
  - Multi-Step UI Component: An interactive, modern Inertia multi-step wizard component with step state management, responsive Tailwind layout, and real-time step validation.

---

## 2. CORE LOGIC & SCORING MECHANICS

### 2.1 Question Structure & Color Tags (Questions 1 to 6)
Each option in Questions 1 through 6 carries a specific color tag and point value:
- **Red (`red`):** `1 Point` — Urgent need, immediate conversion focus.
- **Yellow (`yellow`):** `2 Points` — Brand positioning / Trust-building focus.
- **Green (`green`):** `3 Points` — Consistency, scalability, high operational maturity.
- **Blue (`blue`):** `2 Points` — **Foundation / Startup Flag** (Indicates a newly launched project or baseline setup).

### 2.2 Special Foundation Rule (Override Condition)
- If a user selects **3 or more Blue (`blue`) options** across Questions 1–6, the system **automatically triggers Result 4 (Foundation State / Startup Stage)**, overriding the numerical sum total score.

### 2.3 Standard Score Ranges (When Special Rule is NOT triggered)
- **Track 1: Social Media Written Content (Max Score: 18)**
  - `6 – 11 Points` (< 55%): **Tier 1 — Strategic Tuning & Foundation Stage**
  - `12 – 16 Points` (55%–74%): **Tier 2 — Sales Leakage Stage (Inquiries without Closing)**
  - `17 – 18 Points` (≥ 75%): **Tier 3 — Stability & Expansion Readiness Stage**

- **Tracks 2, 3, & 4: Visual Execution, SEO, Web Development (Max Score: 18)**
  - `6 – 9 Points` (< 55%): **Tier 1 — Foundation & Core Tuning Stage**
  - `10 – 13 Points` (55%–74%): **Tier 2 — Operational Friction / Conversion Optimization Stage**
  - `14 – 18 Points` (≥ 75%): **Tier 3 — Market Leadership & Scalability Stage**

### 2.4 Question 7 Mechanics (Goal Selection)
- **Question 7 is excluded from score calculation.**
- Based on the user's selected primary goal option in Q7 (`red`, `yellow`, `green`, or `blue`), the system dynamically selects a matching **Goal-Based Tailored CTA** paragraph and appends it to the final diagnostic report.

---

## 3. USER WORKFLOW STEPS

```
[ Step 1: Select Track ] ➔ [ Step 2: Answer Q1–Q6 ] ➔ [ Step 3: Answer Q7 (Goal) ]
                                                                 │
                                                                 ▼
                                            [ Step 4: Lead Capture Form ]
                                            └── Displays: Quick Teaser Diagnosis
                                                                 │
                                                                 ▼
                                            [ Step 5: Final Comprehensive Report ]
                                            ├── Stage Title & Badge
                                            ├── Current Diagnosis Paragraph
                                            ├── Technical Challenge Analysis
                                            ├── Core Recommendation & Actionable CTA
                                            └── Dynamic Goal-Based Tailored CTA (Q7)
```

1. **Step 1: Track Selection** — User selects one of the 4 specialized tracks.
2. **Step 2: Questions 1 to 6** — Interactive multiple-choice questions with visual color badges.
3. **Step 3: Question 7 (Goal Selection)** — Selects primary business goal.
4. **Step 4: Lead Capture Form** — Captures Name, Phone/WhatsApp, Business Name, and Email. Immediately renders a **Quick Teaser Diagnosis** (1–2 sentences) above the form to incentivize submission.
5. **Step 5: Final Comprehensive Diagnostic Report** — Full breakdown with technical analysis, specific recommendations, custom goal-based CTA, print/share options, and direct WhatsApp contact trigger.

---

## 4. DATABASE SCHEMA (Migrations & Models)

Create the following models, migrations, factories, and seeders:

### 1. `assessment_categories`
- `id` (bigIncrements)
- `slug` (string, unique) — `written-content`, `visual-execution`, `seo-research`, `web-development`
- `title` (string)
- `description` (text)
- `timestamps`

### 2. `questions`
- `id` (bigIncrements)
- `assessment_category_id` (foreignId constrained)
- `question_number` (integer: 1 to 7)
- `text` (text)
- `is_goal_question` (boolean, default false)
- `timestamps`

### 3. `question_options`
- `id` (bigIncrements)
- `question_id` (foreignId constrained)
- `color_tag` (enum: `red`, `yellow`, `green`, `blue`)
- `score_weight` (integer)
- `text` (text)
- `timestamps`

### 4. `diagnostic_rules`
- `id` (bigIncrements)
- `assessment_category_id` (foreignId constrained)
- `result_tier` (integer: 1, 2, 3, 4)
- `min_score` (integer)
- `max_score` (integer)
- `is_special_foundation` (boolean, default false)
- `preliminary_teaser` (text)
- `stage_title` (string)
- `current_diagnosis` (text)
- `technical_analysis` (text)
- `recommendation_cta` (text)
- `timestamps`

### 5. `goal_ctas`
- `id` (bigIncrements)
- `assessment_category_id` (foreignId constrained)
- `color_tag` (enum: `red`, `yellow`, `green`, `blue`)
- `cta_text` (text)
- `timestamps`

### 6. `assessment_submissions`
- `id` (bigIncrements)
- `uuid` (uuid, unique)
- `assessment_category_id` (foreignId constrained)
- `lead_name` (string)
- `lead_phone` (string)
- `lead_business_name` (string)
- `lead_email` (string, nullable)
- `total_score` (integer)
- `blue_answers_count` (integer)
- `triggered_tier` (integer)
- `selected_goal_tag` (string)
- `preliminary_teaser` (text)
- `full_report_json` (json)
- `timestamps`

---

## 5. BACKEND DIAGNOSTIC SERVICE & CONTROLLER

Create `App\Services\AssessmentDiagnosticService`:

```php
namespace App\Services;

use App\Models\AssessmentCategory;
use App\Models\DiagnosticRule;
use App\Models\GoalCta;
use App\Models\AssessmentSubmission;
use Illuminate\Support\Str;

class AssessmentDiagnosticService
{
    public function calculateAndEvaluate(
        AssessmentCategory $category,
        array $answers, // [question_id => option_id]
        array $leadData
    ): AssessmentSubmission {
        // 1. Fetch options for Q1-Q6
        $q1ToQ6Answers = array_slice($answers, 0, 6, true);
        $options = \App\Models\QuestionOption::whereIn('id', array_values($q1ToQ6Answers))->get();

        $totalScore = $options->sum('score_weight');
        $blueCount = $options->where('color_tag', 'blue')->count();

        // 2. Determine Triggered Tier
        if ($blueCount >= 3) {
            $triggeredTier = 4; // Foundation Override State
            $rule = DiagnosticRule::where('assessment_category_id', $category->id)
                ->where('is_special_foundation', true)
                ->first();
        } else {
            $rule = DiagnosticRule::where('assessment_category_id', $category->id)
                ->where('is_special_foundation', false)
                ->where('min_score', '<=', $totalScore)
                ->where('max_score', '>=', $totalScore)
                ->first();

            $triggeredTier = $rule ? $rule->result_tier : 1;
        }

        // 3. Process Question 7 Goal CTA
        $q7OptionId = end($answers);
        $q7Option = \App\Models\QuestionOption::find($q7OptionId);
        $goalTag = $q7Option ? $q7Option->color_tag : 'red';

        $goalCta = GoalCta::where('assessment_category_id', $category->id)
            ->where('color_tag', $goalTag)
            ->first();

        // 4. Build JSON Snapshot
        $reportSnapshot = [
            'category_title' => $category->title,
            'stage_title' => $rule->stage_title ?? '',
            'current_diagnosis' => $rule->current_diagnosis ?? '',
            'technical_analysis' => $rule->technical_analysis ?? '',
            'recommendation_cta' => $rule->recommendation_cta ?? '',
            'goal_cta_text' => $goalCta->cta_text ?? '',
            'score' => $totalScore,
            'blue_count' => $blueCount,
            'tier' => $triggeredTier,
        ];

        // 5. Store AssessmentSubmission
        return AssessmentSubmission::create([
            'uuid' => (string) Str::uuid(),
            'assessment_category_id' => $category->id,
            'lead_name' => $leadData['name'],
            'lead_phone' => $leadData['phone'],
            'lead_business_name' => $leadData['business_name'],
            'lead_email' => $leadData['email'] ?? null,
            'total_score' => $totalScore,
            'blue_answers_count' => $blueCount,
            'triggered_tier' => $triggeredTier,
            'selected_goal_tag' => $goalTag,
            'preliminary_teaser' => $rule->preliminary_teaser ?? '',
            'full_report_json' => $reportSnapshot,
        ]);
    }
}
```

---

## 6. COMPLETE SEEDER DATA IN ENGLISH

Create `database/seeders/DigitalPresenceAssessmentSeeder.php` with complete English data:

```php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\AssessmentCategory;
use App\Models\Question;
use App\Models\QuestionOption;
use App\Models\DiagnosticRule;
use App\Models\GoalCta;

class DigitalPresenceAssessmentSeeder extends Seeder
{
    public function run(): void
    {
        // =========================================================================
        // TRACK 1: Social Media Written Content
        // =========================================================================
        $writtenCat = AssessmentCategory::create([
            'slug' => 'written-content',
            'title' => 'Social Media Written Content & Strategy',
            'description' => 'Evaluate your brand tone, copy effectiveness, and sales copy conversions.',
        ]);

        // Diagnostic Rules for Track 1
        DiagnosticRule::create([
            'assessment_category_id' => $writtenCat->id,
            'result_tier' => 1,
            'min_score' => 6,
            'max_score' => 11,
            'is_special_foundation' => false,
            'preliminary_teaser' => '⚠️ Quick Diagnosis: Strategic Tuning & Foundation Stage... Your current content relies on ad-hoc efforts that require structure to highlight your true value proposition.',
            'stage_title' => 'Stage 1: Strategic Tuning & Messaging Foundation',
            'current_diagnosis' => 'Your content currently relies on fragmented efforts that fail to communicate the real value of your offer. This results in inefficient ad spend and inconsistent lead flow.',
            'technical_analysis' => 'Prospects leave without purchasing because they cannot perceive the difference between you and your competitors. The issue lies in missing value-driven messaging structure.',
            'recommendation_cta' => 'To elevate your content and define your brand identity clearly, let us help you build a structured voice tone and conversion copy strategy.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $writtenCat->id,
            'result_tier' => 2,
            'min_score' => 12,
            'max_score' => 16,
            'is_special_foundation' => false,
            'preliminary_teaser' => '🔍 Quick Diagnosis: Sales Leakage Stage (Inquiries Without Closing)... Your content attracts interest and questions, but lacks conversion triggers to close deals.',
            'stage_title' => 'Stage 2: Sales Leakage & Conversion Optimization',
            'current_diagnosis' => 'Your content successfully generates curiosity and inbound questions ("How much?"), but suffers from a drop-off during the final buying decision.',
            'technical_analysis' => 'Inbound leads stall because key objections (guarantees, pricing clarity, risk reversal) are not addressed in the copy before direct contact happens.',
            'recommendation_cta' => 'You are one step away from closing high-value sales. We need to optimize your copy with strategic conversion triggers to close prospects effortlessly.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $writtenCat->id,
            'result_tier' => 3,
            'min_score' => 17,
            'max_score' => 18,
            'is_special_foundation' => false,
            'preliminary_teaser' => '🚀 Quick Diagnosis: Stability & Expansion Readiness Stage... Strong digital presence and value-packed content; the goal now is operational scaling without burnout.',
            'stage_title' => 'Stage 3: Stability & Market Expansion Readiness',
            'current_diagnosis' => 'Your brand messaging is strong and clearly communicates value. The bottleneck is maintaining continuous content execution without operational fatigue.',
            'technical_analysis' => 'You possess a solid foundation. The main challenge is continuous angle innovation and delegating content production so leadership can focus on scaling.',
            'recommendation_cta' => 'It is time to hand over content execution to a specialized team. Book a growth strategy call with us to structure your expansion content calendar.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $writtenCat->id,
            'result_tier' => 4,
            'min_score' => 0,
            'max_score' => 0,
            'is_special_foundation' => true,
            'preliminary_teaser' => '📌 Quick Diagnosis: Foundation & Brand Launch Stage... Your business is starting out, presenting the perfect opportunity to set the right marketing foundation.',
            'stage_title' => 'Stage 4: New Business Foundation & Brand Positioning',
            'current_diagnosis' => 'Your business is in its initial setup phase. This is the best moment to build on sound strategic foundations rather than trial and error.',
            'technical_analysis' => 'Starting with clear brand messaging, defined customer avatars, and tailored ad angles will save you months of wasted ad budget.',
            'recommendation_cta' => 'Start strong by booking a foundational brand positioning consultation for your new business.',
        ]);

        // Goal CTAs for Track 1
        GoalCta::create([
            'assessment_category_id' => $writtenCat->id,
            'color_tag' => 'red',
            'cta_text' => 'Based on your goal to maximize conversion rates, our focus will be on rewriting your direct-response sales copy and creating high-converting ad angles that address immediate buying triggers. Book your free consultation session now to map out your high-converting copy strategy.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $writtenCat->id,
            'color_tag' => 'yellow',
            'cta_text' => 'Based on your goal to establish premium authority, your account needs strategic brand messaging that reinforces trust and highlights unique selling propositions. Book a strategy session now to craft your brand voice.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $writtenCat->id,
            'color_tag' => 'green',
            'cta_text' => 'Based on your goal of consistent publishing, your brand requires a dynamic content calendar that ensures daily presence with fresh angles. Schedule your strategy session today to streamline your content pipeline.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $writtenCat->id,
            'color_tag' => 'blue',
            'cta_text' => 'Based on your goal to completely delegate content operations, we offer complete end-to-end management covering strategy, scriptwriting, and copywriting. Book a partnership call to outsource your content ops.',
        ]);

        // =========================================================================
        // TRACK 2: Visual Execution & Video Production
        // =========================================================================
        $visualCat = AssessmentCategory::create([
            'slug' => 'visual-execution',
            'title' => 'Visual Design & Video Production',
            'description' => 'Audit your visual identity, video reels editing quality, and brand consistency.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $visualCat->id,
            'result_tier' => 1,
            'min_score' => 6,
            'max_score' => 9,
            'is_special_foundation' => false,
            'preliminary_teaser' => '👁️ Quick Diagnosis: Visual Identity Enhancement Stage... Your media presence requires modern aesthetic upgrades to hook viewer attention while scrolling.',
            'stage_title' => 'Stage 1: Visual Identity & Aesthetic Upgrade',
            'current_diagnosis' => 'Your social channels rely on inconsistent design templates that fail to capture audience attention in crowded feeds.',
            'technical_analysis' => 'Visual hook rate is low because graphics lack clear visual hierarchy, modern color balance, and polished video editing.',
            'recommendation_cta' => 'Let us revamp your visual brand identity and create sleek, high-stopping video templates.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $visualCat->id,
            'result_tier' => 2,
            'min_score' => 10,
            'max_score' => 13,
            'is_special_foundation' => false,
            'preliminary_teaser' => '🎬 Quick Diagnosis: Video Friction & Editing Bottleneck... Good content ideas, but editing pace and visual storytelling limit video virality.',
            'stage_title' => 'Stage 2: Short-Form Video & Editing Optimization',
            'current_diagnosis' => 'While your video ideas are promising, slow editing pacing and lack of visual dynamic cuts cause viewers to drop off early.',
            'technical_analysis' => 'Retention rates drop within the first 3 seconds due to missing dynamic motion graphics, sound design, and fast pacing.',
            'recommendation_cta' => 'Upgrade your Reels and TikTok output with professional short-form editing optimized for high retention.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $visualCat->id,
            'result_tier' => 3,
            'min_score' => 14,
            'max_score' => 18,
            'is_special_foundation' => false,
            'preliminary_teaser' => '👑 Quick Diagnosis: Visual Leadership & Brand Scalability... Premium visual identity with high production value; focus on scaling output.',
            'stage_title' => 'Stage 3: Premium Brand Authority & Scale',
            'current_diagnosis' => 'Your brand visually stands out with high production value and sleek visual consistency.',
            'technical_analysis' => 'Your main objective is maintaining rapid content production without sacrificing high aesthetic standards.',
            'recommendation_cta' => 'Partner with our dedicated media production team to scale high-end visual production effortlessly.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $visualCat->id,
            'result_tier' => 4,
            'min_score' => 0,
            'max_score' => 0,
            'is_special_foundation' => true,
            'preliminary_teaser' => '📌 Quick Diagnosis: Visual Setup & Design System Phase... Perfect time to build a cohesive visual brand system for your new launch.',
            'stage_title' => 'Stage 4: Design System & Brand Asset Creation',
            'current_diagnosis' => 'Your new project needs a distinct visual identity system from day one.',
            'technical_analysis' => 'Establishing color palettes, typography systems, and video templates early prevents costly rebrand cycles later.',
            'recommendation_cta' => 'Book a visual identity kick-off session to construct your complete brand visual kit.',
        ]);

        GoalCta::create([
            'assessment_category_id' => $visualCat->id,
            'color_tag' => 'red',
            'cta_text' => 'Based on your immediate conversion goals, short-form Reels with high-converting video scripts and dynamic editing are the fastest path to attracting leads. Book a video strategy call.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $visualCat->id,
            'color_tag' => 'yellow',
            'cta_text' => 'Based on your goal to look premium, your brand requires a complete aesthetic overhaul to convey high value from the first frame. Schedule a brand design session.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $visualCat->id,
            'color_tag' => 'green',
            'cta_text' => 'Based on your goal of seamless publishing, delegating graphic design and video editing to a dedicated studio ensures timely delivery. Connect with our team today.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $visualCat->id,
            'color_tag' => 'blue',
            'cta_text' => 'Based on your launch goals, combining custom visual guidelines with recurring social media assets gives you complete market readiness. Request your custom branding deck.',
        ]);

        // =========================================================================
        // TRACK 3: SEO & Web Content Research
        // =========================================================================
        $seoCat = AssessmentCategory::create([
            'slug' => 'seo-research',
            'title' => 'SEO & Search Content Research',
            'description' => 'Analyze organic search visibility, keyword targeting, and authority content.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $seoCat->id,
            'result_tier' => 1,
            'min_score' => 6,
            'max_score' => 9,
            'is_special_foundation' => false,
            'preliminary_teaser' => '🔴 Quick Diagnosis: Organic Traffic Setup Required... High dependency on paid ads; massive untapped organic search potential.',
            'stage_title' => 'Stage 1: Technical & On-Page SEO Foundations',
            'current_diagnosis' => 'Your site relies almost entirely on paid ad campaigns to drive traffic, leaving valuable organic search demand untapped.',
            'technical_analysis' => 'Search engines struggle to index your primary money pages due to unoptimized metadata and lack of targeted transactional keywords.',
            'recommendation_cta' => 'Build a long-term organic traffic engine that lowers your customer acquisition costs (CAC). Book an SEO audit.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $seoCat->id,
            'result_tier' => 2,
            'min_score' => 10,
            'max_score' => 13,
            'is_special_foundation' => false,
            'preliminary_teaser' => '🟡 Quick Diagnosis: Search Intent & Article Optimization... Good indexation, but content needs optimization for high-intent search terms.',
            'stage_title' => 'Stage 2: Keyword Strategy & Search Intent Tuning',
            'current_diagnosis' => 'Your site ranks for informational terms, but misses transactional high-intent search traffic.',
            'technical_analysis' => 'Content depth and internal linking structures require tuning to pass link equity to primary sales landing pages.',
            'recommendation_cta' => 'Optimize existing content assets to convert search readers into direct inbound sales calls.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $seoCat->id,
            'result_tier' => 3,
            'min_score' => 14,
            'max_score' => 18,
            'is_special_foundation' => false,
            'preliminary_teaser' => '🟢 Quick Diagnosis: Search Dominance & Thought Leadership... Excellent search foundations; focus on industry keyword dominance.',
            'stage_title' => 'Stage 3: Market Dominance & Pillar Content',
            'current_diagnosis' => 'Your website commands steady organic traffic and strong domain authority.',
            'technical_analysis' => 'Expand topic clusters and conduct proprietary industry research to capture remaining high-value search terms.',
            'recommendation_cta' => 'Schedule an advanced SEO scaling meeting to dominate competitive industry search keywords.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $seoCat->id,
            'result_tier' => 4,
            'min_score' => 0,
            'max_score' => 0,
            'is_special_foundation' => true,
            'preliminary_teaser' => '📌 Quick Diagnosis: Initial Indexing & Keyword Roadmap... Ideal time to structure site architecture for search engines before launch.',
            'stage_title' => 'Stage 4: Pre-Launch SEO Architecture',
            'current_diagnosis' => 'Your site is being launched or revamped; setting search architecture now prevents future migration penalties.',
            'technical_analysis' => 'Building URL structures, SILO categories, and meta tags prior to indexation ensures fast keyword ranking.',
            'recommendation_cta' => 'Get a pre-launch SEO architecture blueprint before pushing your site live.',
        ]);

        GoalCta::create([
            'assessment_category_id' => $seoCat->id,
            'color_tag' => 'red',
            'cta_text' => 'Based on your goal to acquire leads without ad burn, ranking for high-intent transactional keywords will deliver consistent inbound leads. Schedule your SEO roadmap session.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $seoCat->id,
            'color_tag' => 'yellow',
            'cta_text' => 'Based on your goal to establish corporate authority, publishing research reports and whitepapers will position your brand as an industry leader. Book an authority content consultation.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $seoCat->id,
            'color_tag' => 'green',
            'cta_text' => 'Based on your goal to turn your blog into a knowledge hub, structuring a scalable content engine keeps visitors engaged longer. Talk to our SEO editorial team.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $seoCat->id,
            'color_tag' => 'blue',
            'cta_text' => 'Based on your goal to reduce marketing overhead, continuous organic search optimization offers a high ROI alternative to perpetual ad spend. Claim your strategy call.',
        ]);

        // =========================================================================
        // TRACK 4: Web Design & Development
        // =========================================================================
        $webCat = AssessmentCategory::create([
            'slug' => 'web-development',
            'title' => 'Web Design & Conversion Optimization (CRO)',
            'description' => 'Evaluate website UX/UI speed, mobile responsiveness, and checkout conversion rates.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $webCat->id,
            'result_tier' => 1,
            'min_score' => 6,
            'max_score' => 9,
            'is_special_foundation' => false,
            'preliminary_teaser' => '🔴 Quick Diagnosis: UX Performance & Mobile Speed Upgrade... Slow page load speeds and friction on mobile devices are hurting conversions.',
            'stage_title' => 'Stage 1: Speed Performance & Mobile UX Refactor',
            'current_diagnosis' => 'Your website experiences high bounce rates due to slow mobile loading speeds and confusing navigation.',
            'technical_analysis' => 'Page load speed exceeds 3.5 seconds on mobile networks, and primary call-to-action buttons are hidden below the fold.',
            'recommendation_cta' => 'Refactor your frontend performance and mobile layout to capture lost ad traffic immediately.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $webCat->id,
            'result_tier' => 2,
            'min_score' => 10,
            'max_score' => 13,
            'is_special_foundation' => false,
            'preliminary_teaser' => '🟡 Quick Diagnosis: Conversion Funnel & Pixel Tracking Tuning... Healthy traffic, but checkout drop-offs indicate conversion friction.',
            'stage_title' => 'Stage 2: Conversion Rate Optimization (CRO) & Tracking',
            'current_diagnosis' => 'Your site drives decent traffic, but suffers from checkout drop-offs and unoptimized analytics tracking.',
            'technical_analysis' => 'Conversion leakage occurs at the checkout/inquiry form stage. Analytics event pixels are misconfigured.',
            'recommendation_cta' => 'Streamline your checkout journey and fix pixel event tracking to maximize ROI.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $webCat->id,
            'result_tier' => 3,
            'min_score' => 14,
            'max_score' => 18,
            'is_special_foundation' => false,
            'preliminary_teaser' => '🟢 Quick Diagnosis: Scalable Architecture & A/B Testing... Fast, responsive infrastructure; ready for custom portal features and scale.',
            'stage_title' => 'Stage 3: Enterprise Web Infrastructure & A/B Scaling',
            'current_diagnosis' => 'Your web platform is fast, responsive, and well-integrated.',
            'technical_analysis' => 'Next growth opportunities include automated client dashboards, custom API integrations, and continuous A/B split testing.',
            'recommendation_cta' => 'Book an enterprise architecture consultation to build custom features and automated workflows.',
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $webCat->id,
            'result_tier' => 4,
            'min_score' => 0,
            'max_score' => 0,
            'is_special_foundation' => true,
            'preliminary_teaser' => '📌 Quick Diagnosis: Turnkey Platform Build Phase... Perfect stage to construct a fast, conversion-focused custom site.',
            'stage_title' => 'Stage 4: Turnkey Web Platform Development',
            'current_diagnosis' => 'Your business needs a high-converting digital storefront built on a solid tech stack.',
            'technical_analysis' => 'Building on a clean Laravel/Inertia stack guarantees ultra-fast response times and full customization freedom.',
            'recommendation_cta' => 'Get a complete project scope and UI mockups for your upcoming web platform.',
        ]);

        GoalCta::create([
            'assessment_category_id' => $webCat->id,
            'color_tag' => 'red',
            'cta_text' => 'Based on your goal to increase online sales immediately, optimizing your sales landing page UX will instantly boost checkout conversions. Schedule a web CRO audit.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $webCat->id,
            'color_tag' => 'yellow',
            'cta_text' => 'Based on your goal to position as an elite market player, a bespoke design with fluid animations will give clients instant trust. Schedule a design consultation.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $webCat->id,
            'color_tag' => 'green',
            'cta_text' => 'Based on your goal to automate customer orders, building a self-service client portal will streamline fulfillment 24/7. Book a portal architecture call.',
        ]);
        GoalCta::create([
            'assessment_category_id' => $webCat->id,
            'color_tag' => 'blue',
            'cta_text' => 'Based on your goal for an easy-to-manage platform, we build custom admin dashboards allowing your team to update content effortlessly without coding. Schedule a demo.',
        ]);
    }
}
```

---

## 8. FRONTEND INERTIA COMPONENT SPECIFICATIONS


- **Step Bar:** Header displaying current step count (e.g., "Step 2 of 5") with a progress percentage bar.
- **Color Choice Badges:** Options styled with distinct visual border tags corresponding to `red` (coral red border), `yellow` (amber border), `green` (emerald border), and `blue` (indigo/sky blue border).
- **Lead Capture Form (Step 4):**
  - Features a highlighted container displaying the `preliminary_teaser` text retrieved from the server for instant validation before submitting personal details.
  - Form posts to `/assessment/submit` via Inertia Form Helper.
- **Final Report Screen (Step 5):**
  - Displays: Stage Badge, Title, Diagnosis, Technical Challenge Analysis, Actionable Recommendation, and the appended Q7 Goal-Based CTA.
  - Buttons for: "Book Consultation via WhatsApp", "Download / Print PDF Report", and "Re-evaluate New Track".

---

## 9. EXECUTION INSTRUCTIONS FOR KILO CODE

1. Run migrations and seeders:
   `php artisan migrate:fresh --seed --seeder=DigitalPresenceAssessmentSeeder`
2. Ensure Inertia routes are mapped in `routes/web.php`:
   - `GET /assessment` -> Controller rendering `Assessment/Wizard`
   - `POST /assessment/evaluate-teaser` -> Returns preliminary teaser based on initial answers
   - `POST /assessment/submit` -> Calls `AssessmentDiagnosticService` and returns the complete submission JSON for Step 5 report display.