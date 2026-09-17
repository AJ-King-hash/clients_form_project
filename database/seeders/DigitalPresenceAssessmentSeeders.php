<?php

namespace Database\Seeders;

use App\Models\AssessmentCategory;
use App\Models\DiagnosticRule;
use App\Models\GoalCta;
use App\Models\Question;
use App\Models\QuestionOption;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DigitalPresenceAssessmentSeeders extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        // =========================================================================
        // TRACK 1: Social Media Written Content & Strategy
        // =========================================================================
        $writtenCat = AssessmentCategory::create([
            'slug' => 'written-content',
            'title' => [
                'ar' => 'المحتوى المكتوب وإستراتيجية وسائل التواصل الاجتماعي',
                'en' => 'Social Media Written Content & Strategy',
            ],
            'description' => [
                'ar' => 'تقييم نبرة العلامة التجارية، فعالية النصوص الإعلانية، ونسب تحويل المبيعات.',
                'en' => 'Evaluate your brand tone, copy effectiveness, and sales copy conversions.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $writtenCat->id,
            'result_tier' => 1,
            'min_score' => 6,
            'max_score' => 11,
            'is_special_foundation' => false,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: مرحلة الضبط الإستراتيجي والتأسيس',
                'en' => 'Quick Diagnosis: Strategic Tuning & Foundation Stage',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 1: الضبط الإستراتيجي وتأسيس الرسائل',
                'en' => 'Stage 1: Strategic Tuning & Messaging Foundation',
            ],
            'current_diagnosis' => [
                'ar' => 'يعتمد محتواك حالياً على جهود غير مترابطة.',
                'en' => 'Your content currently relies on fragmented efforts.',
            ],
            'technical_analysis' => [
                'ar' => 'يغادر العملاء المحتملون دون إتمام عملية الشراء.',
                'en' => 'Prospects leave without purchasing.',
            ],
            'recommendation_cta' => [
                'ar' => 'للارتقاء بمحتواك وتحديد هوية علامتك التجارية بوضوح.',
                'en' => 'To elevate your content and define your brand identity clearly.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $writtenCat->id,
            'result_tier' => 2,
            'min_score' => 12,
            'max_score' => 16,
            'is_special_foundation' => false,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: مرحلة تسرب المبيعات',
                'en' => 'Quick Diagnosis: Sales Leakage Stage',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 2: تسرب المبيعات وتحسين التحويل',
                'en' => 'Stage 2: Sales Leakage & Conversion Optimization',
            ],
            'current_diagnosis' => [
                'ar' => 'يثير محتواك الاهتمام لكنه يفتقر إلى محفزات إتمام الشراء.',
                'en' => 'Your content generates curiosity but lacks conversion triggers.',
            ],
            'technical_analysis' => [
                'ar' => 'تتوقف مبيعات العملاء المحتملين لعدم معالجة الاعتراضات الرئيسية.',
                'en' => 'Inbound leads stall because key objections are not addressed.',
            ],
            'recommendation_cta' => [
                'ar' => 'قم بتحسين محتواك باستخدام محفزات تحويل إستراتيجية.',
                'en' => 'Optimize your copy with strategic conversion triggers.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $writtenCat->id,
            'result_tier' => 3,
            'min_score' => 17,
            'max_score' => 18,
            'is_special_foundation' => false,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: مرحلة الاستقرار والجاهزية للتوسع',
                'en' => 'Quick Diagnosis: Stability & Expansion Readiness Stage',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 3: الاستقرار وجاهزية التوسع في السوق',
                'en' => 'Stage 3: Stability & Market Expansion Readiness',
            ],
            'current_diagnosis' => [
                'ar' => 'رسالة علامتك التجارية قوية وتوصل القيمة بوضوح.',
                'en' => 'Your brand messaging is strong and clearly communicates value.',
            ],
            'technical_analysis' => [
                'ar' => 'التحدي الرئيسي هو التجديد المستمر في زوايا الطرح.',
                'en' => 'The main challenge is continuous angle innovation.',
            ],
            'recommendation_cta' => [
                'ar' => 'احجز جلسة استراتيجية نمو لتنظيم جدول محتوى التوسع الخاص بك.',
                'en' => 'Book a growth strategy call to structure your expansion content calendar.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $writtenCat->id,
            'result_tier' => 4,
            'min_score' => 0,
            'max_score' => 0,
            'is_special_foundation' => true,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: مرحلة التأسيس وإطلاق العلامة التجارية',
                'en' => 'Quick Diagnosis: Foundation & Brand Launch Stage',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 4: تأسيس الأعمال الجديدة وتحديد موقع العلامة التجارية',
                'en' => 'Stage 4: New Business Foundation & Brand Positioning',
            ],
            'current_diagnosis' => [
                'ar' => 'مشروعك حالياً في مرحلة الإعداد الأولى.',
                'en' => 'Your business is in its initial setup phase.',
            ],
            'technical_analysis' => [
                'ar' => 'البدء برائل تجارية واضحة سيوفر أشهر من الميزانيات الإعلانية المهدرة.',
                'en' => 'Starting with clear brand messaging will save months of wasted ad budget.',
            ],
            'recommendation_cta' => [
                'ar' => 'ابدأ بقوة من خلال حجز استشارة لتحديد موقع علامتك التجارية.',
                'en' => 'Start strong by booking a foundational brand positioning consultation.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $writtenCat->id,
            'color_tag' => 'red',
            'cta_text' => [
                'ar' => 'بناءً على هدفك لزيادة معدلات التحويل، سينصب تركيزنا على إعادة كتابة النصوص الإعلانية المباشرة. احجز جلسة استشارتك المجانية الآن.',
                'en' => 'Based on your goal to maximize conversion rates, our focus will be on rewriting your direct-response sales copy. Book your free consultation session now.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $writtenCat->id,
            'color_tag' => 'yellow',
            'cta_text' => [
                'ar' => 'بناءً على هدفك لبناء سلطة تجارية مرموقة، يحتاج حسابك إلى رسائل إستراتيجية للعلامة التجارية. احجز جلسة إستراتيجية الآن.',
                'en' => 'Based on your goal to establish premium authority, your account needs strategic brand messaging. Book a strategy session now.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $writtenCat->id,
            'color_tag' => 'green',
            'cta_text' => [
                'ar' => 'بناءً على هدفك في النشر المنتظم، تتطلب علامتك التجارية جدول محتوى ديناميكي. حدد موعد جلسة الإستراتيجية الخاصة بك اليوم.',
                'en' => 'Based on your goal of consistent publishing, your brand requires a dynamic content calendar. Schedule your strategy session today.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $writtenCat->id,
            'color_tag' => 'blue',
            'cta_text' => [
                'ar' => 'بناءً على هدفك لتفويض عمليات المحتوى بالكامل، نقدم إدارة شاملة ومتكاملة. احجز مكالمة شراكة معنا.',
                'en' => 'Based on your goal to completely delegate content operations, we offer complete end-to-end management. Book a partnership call.',
            ],
        ]);

        $q1 = Question::create([
            'assessment_category_id' => $writtenCat->id,
            'question_number' => 1,
            'text' => [
                'ar' => 'كم مرة تنشر منشورات جديدة على وسائل التواصل الاجتماعي؟',
                'en' => 'How often do you publish new social media posts?',
            ],
            'is_goal_question' => false,
        ]);

        QuestionOption::create(['question_id' => $q1->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'نادراً أو أبداً', 'en' => 'Rarely or never']]);
        QuestionOption::create(['question_id' => $q1->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'مرات قليلة في الشهر', 'en' => 'A few times a month']]);
        QuestionOption::create(['question_id' => $q1->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'عدة مرات في الأسبوع', 'en' => 'Multiple times per week']]);
        QuestionOption::create(['question_id' => $q1->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو ونختبر ما يعمل', 'en' => 'Just started, testing what works']]);

        $q2 = Question::create([
            'assessment_category_id' => $writtenCat->id,
            'question_number' => 2,
            'text' => [
                'ar' => 'ما مدى نجاح النصوص الإعلانية في إيصال القيمة الفريدة لعرضك؟',
                'en' => 'How well does your copy communicate the unique value of your offer?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $q2->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'غير واضحة، المنافسون يبدون أفضل', 'en' => 'Unclear, competitors sound better']]);
        QuestionOption::create(['question_id' => $q2->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'مقبولة ولكن يمكن أن تكون أكثر دقة', 'en' => 'Decent but could be sharper']]);
        QuestionOption::create(['question_id' => $q2->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'ميزة تنافسية واضحة جداً', 'en' => 'Crystal clear USP']]);
        QuestionOption::create(['question_id' => $q2->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'ما زلنا نحاول تحديد زاوية الطرح المناسبة', 'en' => 'Still figuring out our angle']]);

        $q3 = Question::create([
            'assessment_category_id' => $writtenCat->id,
            'question_number' => 3,
            'text' => [
                'ar' => 'هل لديك دليل محدد لنبرة وصوت العلامة التجارية؟',
                'en' => 'Do you have a defined brand voice and tone guide?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $q3->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'لا، كل شيء يتم بشكل عشوائي', 'en' => 'No, everything is ad-hoc']]);
        QuestionOption::create(['question_id' => $q3->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'توجد إرشادات غير رسمية', 'en' => 'Informal guidelines exist']]);
        QuestionOption::create(['question_id' => $q3->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'موثقة وتطبق بشكل مستمر', 'en' => 'Documented and consistently applied']]);
        QuestionOption::create(['question_id' => $q3->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو في تحديدها', 'en' => 'Just started defining it']]);

        $q4 = Question::create([
            'assessment_category_id' => $writtenCat->id,
            'question_number' => 4,
            'text' => [
                'ar' => 'كم مرة تعيد استخدام وإعادة صياغة المحتوى الأفضل أداءً؟',
                'en' => 'How often do you reuse and repurpose top-performing content?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $q4->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'نادراً، ننشئ دائماً من الصفر', 'en' => 'Rarely, always creating from scratch']]);
        QuestionOption::create(['question_id' => $q4->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'أحياناً، ولكن بشكل غير منتظم', 'en' => 'Sometimes, but inconsistently']]);
        QuestionOption::create(['question_id' => $q4->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'نعيد صيغته بانتظام عبر كافة القنوات', 'en' => 'Systematically repurposed across channels']]);
        QuestionOption::create(['question_id' => $q4->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'ليس بعد، ما زلنا نبني مكتبة المحتوى', 'en' => 'Not yet, still building library']]);

        $q5 = Question::create([
            'assessment_category_id' => $writtenCat->id,
            'question_number' => 5,
            'text' => [
                'ar' => 'ما مدى قوة دعوات اتخاذ الإجراء (CTA) في منشوراتك؟',
                'en' => 'How strong are your calls-to-action (CTAs) in your posts?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $q5->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'ضعيفة أو مفقودة', 'en' => 'Weak or missing CTAs']]);
        QuestionOption::create(['question_id' => $q5->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'توجد بعض الدعوات ولكن النتائج غير متناسقة', 'en' => 'Some CTAs, inconsistent results']]);
        QuestionOption::create(['question_id' => $q5->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'دعوات قوية وتحقق معدلات تحويل عالية', 'en' => 'High-converting, action-driven CTAs']]);
        QuestionOption::create(['question_id' => $q5->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو بإضافة دعوات اتخاذ الإجراء', 'en' => 'Just adding CTAs now']]);

        $q6 = Question::create([
            'assessment_category_id' => $writtenCat->id,
            'question_number' => 6,
            'text' => [
                'ar' => 'كيف تقوم بتحليل أداء المحتوى والتفاعل؟',
                'en' => 'How do you analyze content performance and engagement?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $q6->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'لا يوجد تتبع منظم', 'en' => 'No systematic tracking']]);
        QuestionOption::create(['question_id' => $q6->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'مقاييس أساسية ومراجعات متفرقة', 'en' => 'Basic metrics, sporadic reviews']]);
        QuestionOption::create(['question_id' => $q6->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'دورة تحسين مستمرة قائمة على البيانات', 'en' => 'Data-driven optimization cycle']]);
        QuestionOption::create(['question_id' => $q6->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو في تتبع الأساسيات', 'en' => 'Just started tracking basics']]);

        $q7 = Question::create([
            'assessment_category_id' => $writtenCat->id,
            'question_number' => 7,
            'text' => [
                'ar' => 'ما هو هدفك التجاري الرئيسي من محتوى وسائل التواصل الاجتماعي؟',
                'en' => 'What is your primary business goal for social media content?',
            ],
            'is_goal_question' => true,
        ]);
        QuestionOption::create(['question_id' => $q7->id, 'color_tag' => 'red', 'score_weight' => 0, 'text' => ['ar' => 'زيادة معدلات التحويل بأقصى قدر', 'en' => 'Maximize conversion rates']]);
        QuestionOption::create(['question_id' => $q7->id, 'color_tag' => 'yellow', 'score_weight' => 0, 'text' => ['ar' => 'بناء سلطة ومصداقية عالية', 'en' => 'Establish premium authority']]);
        QuestionOption::create(['question_id' => $q7->id, 'color_tag' => 'green', 'score_weight' => 0, 'text' => ['ar' => 'تحقيق النشر المنتظم', 'en' => 'Achieve consistent publishing']]);
        QuestionOption::create(['question_id' => $q7->id, 'color_tag' => 'blue', 'score_weight' => 0, 'text' => ['ar' => 'تفويض عمليات المحتوى بالكامل', 'en' => 'Completely delegate content operations']]);

        // =========================================================================
        // TRACK 2: Visual Execution & Video Production
        // =========================================================================
        $visualCat = AssessmentCategory::create([
            'slug' => 'visual-execution',
            'title' => [
                'ar' => 'التصميم البصري وإنتاج الفيديو',
                'en' => 'Visual Design & Video Production',
            ],
            'description' => [
                'ar' => 'تدقيق الهوية البصرية، جودة تحرير الفيديوهات القصيرة (Reels)، واتساق العلامة التجارية.',
                'en' => 'Audit your visual identity, video reels editing quality, and brand consistency.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $visualCat->id,
            'result_tier' => 1,
            'min_score' => 6,
            'max_score' => 9,
            'is_special_foundation' => false,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: مرحلة تحسين الهوية البصرية',
                'en' => 'Quick Diagnosis: Visual Identity Enhancement Stage',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 1: الهوية البصرية والارتقاء بالمظهر العام',
                'en' => 'Stage 1: Visual Identity & Aesthetic Upgrade',
            ],
            'current_diagnosis' => [
                'ar' => 'تعتمد قنواتك الاجتماعية على قوالب تصميم غير متناسقة.',
                'en' => 'Your social channels rely on inconsistent design templates.',
            ],
            'technical_analysis' => [
                'ar' => 'معدل جذب الانتباه البصري منخفض بسبب غياب التسلسل الهرمي البصري.',
                'en' => 'Visual hook rate is low due to lack of visual hierarchy.',
            ],
            'recommendation_cta' => [
                'ar' => 'دعنا نجدد الهوية البصرية لعلامتك التجارية.',
                'en' => 'Let us revamp your visual brand identity.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $visualCat->id,
            'result_tier' => 2,
            'min_score' => 10,
            'max_score' => 13,
            'is_special_foundation' => false,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: مشاكل تحرير الفيديو وعقبات التعديل',
                'en' => 'Quick Diagnosis: Video Friction & Editing Bottleneck',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 2: تحسين الفيديوهات القصيرة والمونتاج',
                'en' => 'Stage 2: Short-Form Video & Editing Optimization',
            ],
            'current_diagnosis' => [
                'ar' => 'أفكار الفيديو واعدة ولكن إيقاع المونتاج يحد من الاحتفاظ بالجمهور.',
                'en' => 'Video ideas are promising but editing pacing limits retention.',
            ],
            'technical_analysis' => [
                'ar' => 'ينخفض معدل الاحتفاظ بالمشاهدين خلال أول 3 ثوانٍ لغياب المؤثرات البصرية المجهّزة.',
                'en' => 'Retention drops within 3 seconds due to missing motion graphics.',
            ],
            'recommendation_cta' => [
                'ar' => 'قم بترقية فيديوهاتك القصيرة (Reels) بمونتاج احترافي.',
                'en' => 'Upgrade your Reels with professional short-form editing.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $visualCat->id,
            'result_tier' => 3,
            'min_score' => 14,
            'max_score' => 18,
            'is_special_foundation' => false,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: الريادة البصرية وقابلية العلامة التجارية للتوسع',
                'en' => 'Quick Diagnosis: Visual Leadership & Brand Scalability',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 3: السلطة البصرية المرموقة والتوسع',
                'en' => 'Stage 3: Premium Brand Authority & Scale',
            ],
            'current_diagnosis' => [
                'ar' => 'تتميز علامتك التجارية بصرياً بقيمة إنتاجية عالية.',
                'en' => 'Your brand visually stands out with high production value.',
            ],
            'technical_analysis' => [
                'ar' => 'التحدي هو الحفاظ على سرعة الإنتاج دون التضحية بالجودة.',
                'en' => 'The challenge is maintaining rapid production without sacrificing quality.',
            ],
            'recommendation_cta' => [
                'ar' => 'كن شريكاً مع فريق الإنتاج الإعلامي المخصص لدينا.',
                'en' => 'Partner with our dedicated media production team.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $visualCat->id,
            'result_tier' => 4,
            'min_score' => 0,
            'max_score' => 0,
            'is_special_foundation' => true,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: مرحلة الإعداد البصري ونظام التصميم',
                'en' => 'Quick Diagnosis: Visual Setup & Design System Phase',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 4: نظام التصميم وإنشاء أصول العلامة التجارية',
                'en' => 'Stage 4: Design System & Brand Asset Creation',
            ],
            'current_diagnosis' => [
                'ar' => 'مشروعك الجديد يحتاج إلى نظام هوية بصرية مميز.',
                'en' => 'Your new project needs a distinct visual identity system.',
            ],
            'technical_analysis' => [
                'ar' => 'تأسيس أصول العلامة التجارية مبكراً يمنع دورات إعادة التقييم المكلفة.',
                'en' => 'Establishing brand assets early prevents costly rebrand cycles.',
            ],
            'recommendation_cta' => [
                'ar' => 'احجز جلسة انطلاق الهوية البصرية.',
                'en' => 'Book a visual identity kick-off session.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $visualCat->id,
            'color_tag' => 'red',
            'cta_text' => [
                'ar' => 'بناءً على أهداف التحويل الفورية الخاصة بك، فإن الفيديوهات القصيرة (Reels) المكتوبة بنصوص عالية التحويل هي أسرع طريق لجذب العملاء المحتملين. احجز مكالمة إستراتيجية فيديو.',
                'en' => 'Based on your immediate conversion goals, short-form Reels with high-converting scripts are the fastest path to attracting leads. Book a video strategy call.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $visualCat->id,
            'color_tag' => 'yellow',
            'cta_text' => [
                'ar' => 'بناءً على هدفك في الظهور بمظهر فاخر، تتطلب علامتك التجارية تجديداً شاملاً في المظهر العام. حدد موعداً لجلسة تصميم العلامة التجارية.',
                'en' => 'Based on your goal to look premium, your brand requires a complete aesthetic overhaul. Schedule a brand design session.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $visualCat->id,
            'color_tag' => 'green',
            'cta_text' => [
                'ar' => 'بناءً على هدفك في النشر السلس، فإن تفويض التصميم ومونتاج الفيديو يضمن التسليم في الوقت المحدد. تواصل مع فريقنا اليوم.',
                'en' => 'Based on your goal of seamless publishing, delegating design and video editing ensures timely delivery. Connect with our team today.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $visualCat->id,
            'color_tag' => 'blue',
            'cta_text' => [
                'ar' => 'بناءً على أهداف الإطلاق الخاصة بك، فإن الجمع بين الإرشادات البصرية المخصصة والأصول الاجتماعية المكررة يمنحك جاهزية كاملة للسوق. اطلب ملف العلامة التجارية المخصص.',
                'en' => 'Based on your launch goals, combining custom visual guidelines with recurring social assets gives you complete market readiness. Request your custom branding deck.',
            ],
        ]);

        $vq1 = Question::create([
            'assessment_category_id' => $visualCat->id,
            'question_number' => 1,
            'text' => [
                'ar' => 'كيف تقيم اتساق الهوية البصرية لعلامتك التجارية حالياً؟',
                'en' => 'How would you rate your current visual brand consistency?',
            ],
            'is_goal_question' => false,
        ]);

        QuestionOption::create(['question_id' => $vq1->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'لا يوجد أسلوب أو هوية بصرية متناسقة', 'en' => 'No consistent style or branding']]);
        QuestionOption::create(['question_id' => $vq1->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'ألوان أساسية ولكن تطبيقها غير منتظم', 'en' => 'Basic colors but inconsistent application']]);
        QuestionOption::create(['question_id' => $vq1->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'هوية بصرية قوية ومتماسكة', 'en' => 'Strong cohesive visual identity']]);
        QuestionOption::create(['question_id' => $vq1->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو في تحديد العناصر البصرية', 'en' => 'Just starting to define brand visuals']]);

        $vq2 = Question::create([
            'assessment_category_id' => $visualCat->id,
            'question_number' => 2,
            'text' => [
                'ar' => 'كيف تقيم جودة وإيقاع تحرير الفيديوهات لديك؟',
                'en' => 'How would you rate your video editing quality and pacing?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $vq2->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'تعديلات أساسية، وإيقاع بطيء', 'en' => 'Basic edits, slow pacing']]);
        QuestionOption::create(['question_id' => $vq2->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'جيدة ولكن يمكن أن تكون أكثر ديناميكية', 'en' => 'Decent but could be more dynamic']]);
        QuestionOption::create(['question_id' => $vq2->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'احترافية، جذابة، وبإيقاع سريع', 'en' => 'Professional, engaging, fast-paced']]);
        QuestionOption::create(['question_id' => $vq2->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'أتعلّم أثناء العمل', 'en' => 'Learning as I go']]);

        $vq3 = Question::create([
            'assessment_category_id' => $visualCat->id,
            'question_number' => 3,
            'text' => [
                'ar' => 'هل لديك مجموعة موحدة من قوالب الفيديو والأصول الجرافيكية؟',
                'en' => 'Do you have a consistent set of video templates and graphics assets?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $vq3->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'لا، كل فيديو يُصمم بشكل مختلف', 'en' => 'No, every video is unique']]);
        QuestionOption::create(['question_id' => $vq3->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'بعض العناصر القابلة لإعادة الاستخدام', 'en' => 'Some reusable elements']]);
        QuestionOption::create(['question_id' => $vq3->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'مكتبة قوالب متكاملة للعلامة التجارية', 'en' => 'Full branded template library']]);
        QuestionOption::create(['question_id' => $vq3->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو في بناء الأصول', 'en' => 'Just starting to build assets']]);

        $vq4 = Question::create([
            'assessment_category_id' => $visualCat->id,
            'question_number' => 4,
            'text' => [
                'ar' => 'ما مدى نجاح فيديوهاتك في جذب المشاهدين خلال أول 3 ثوانٍ؟',
                'en' => 'How well do your videos hook viewers in the first 3 seconds?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $vq4->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'ضعيف، ومعدل مغادرة مرتفع', 'en' => 'Poor, high drop-off rate']]);
        QuestionOption::create(['question_id' => $vq4->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'متوسط، بعض الخطافات تنجح', 'en' => 'Average, some hooks work']]);
        QuestionOption::create(['question_id' => $vq4->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'خطافات قوية، ومعدل احتفاظ عالٍ', 'en' => 'Strong hooks, high retention']]);
        QuestionOption::create(['question_id' => $vq4->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'لا نتابع معدلات الاحتفاظ بعد', 'en' => 'Not tracking retention yet']]);

        $vq5 = Question::create([
            'assessment_category_id' => $visualCat->id,
            'question_number' => 5,
            'text' => [
                'ar' => 'كم مرة تنشر محتوى فيديو؟',
                'en' => 'How often do you publish video content?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $vq5->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'نادراً أو أبداً', 'en' => 'Rarely or never']]);
        QuestionOption::create(['question_id' => $vq5->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'مرات قليلة في الشهر', 'en' => 'A few times a month']]);
        QuestionOption::create(['question_id' => $vq5->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'عدة مرات في الأسبوع', 'en' => 'Multiple times per week']]);
        QuestionOption::create(['question_id' => $vq5->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو بالتجربة', 'en' => 'Just started testing']]);

        $vq6 = Question::create([
            'assessment_category_id' => $visualCat->id,
            'question_number' => 6,
            'text' => [
                'ar' => 'كيف تتبع أداء الفيديو ومعدل احتفاظ الجمهور؟',
                'en' => 'How do you track video performance and audience retention?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $vq6->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'لا يوجد تتبع على الإطلاق', 'en' => 'No tracking at all']]);
        QuestionOption::create(['question_id' => $vq6->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'المشاهدات والإعجابات الأساسية فقط', 'en' => 'Basic views and likes only']]);
        QuestionOption::create(['question_id' => $vq6->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'تحليلات كاملة مع الخرائط الحرارية للاحتفاظ', 'en' => 'Full analytics with retention heatmaps']]);
        QuestionOption::create(['question_id' => $vq6->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو في الاطلاع على المقاييس', 'en' => 'Just starting to look at metrics']]);

        $vq7 = Question::create([
            'assessment_category_id' => $visualCat->id,
            'question_number' => 7,
            'text' => [
                'ar' => 'ما هو هدفك الرئيسي من محتوى الفيديو البصري؟',
                'en' => 'What is your primary visual content goal?',
            ],
            'is_goal_question' => true,
        ]);
        QuestionOption::create(['question_id' => $vq7->id, 'color_tag' => 'red', 'score_weight' => 0, 'text' => ['ar' => 'تحقيق تحويلات فورية', 'en' => 'Drive immediate conversions']]);
        QuestionOption::create(['question_id' => $vq7->id, 'color_tag' => 'yellow', 'score_weight' => 0, 'text' => ['ar' => 'الظهور بمظهر فاخر ومرموق', 'en' => 'Look premium and authoritative']]);
        QuestionOption::create(['question_id' => $vq7->id, 'color_tag' => 'green', 'score_weight' => 0, 'text' => ['ar' => 'النشر بانتظام وبدون عناء', 'en' => 'Publish consistently without stress']]);
        QuestionOption::create(['question_id' => $vq7->id, 'color_tag' => 'blue', 'score_weight' => 0, 'text' => ['ar' => 'الإطلاق بنظام بصري متكامل', 'en' => 'Launch with a full visual system']]);

        // =========================================================================
        // TRACK 3: SEO & Web Content Research
        // =========================================================================
        $seoCat = AssessmentCategory::create([
            'slug' => 'seo-research',
            'title' => [
                'ar' => 'تحسين محركات البحث وبحث محتوى الويب',
                'en' => 'SEO & Search Content Research',
            ],
            'description' => [
                'ar' => 'تحليل الظهور في نتائج البحث المجانية، استهداف الكلمات المفتاحية، ومحتوى السلطة.',
                'en' => 'Analyze organic search visibility, keyword targeting, and authority content.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $seoCat->id,
            'result_tier' => 1,
            'min_score' => 6,
            'max_score' => 9,
            'is_special_foundation' => false,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: تتطلب إعداد الزيارات المجانية',
                'en' => 'Quick Diagnosis: Organic Traffic Setup Required',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 1: أساسيات السيو الفني والسيو على الصفحة',
                'en' => 'Stage 1: Technical & On-Page SEO Foundations',
            ],
            'current_diagnosis' => [
                'ar' => 'يعتمد موقعك كلياً تقريباً على الحملات الإعلانية المدفوعة.',
                'en' => 'Your site relies almost entirely on paid ad campaigns.',
            ],
            'technical_analysis' => [
                'ar' => 'تواجه محركات البحث صعوبة في أرشفة صفحات المبيعات لعدم تحسين البيانات الوصفية.',
                'en' => 'Search engines struggle to index money pages due to unoptimized metadata.',
            ],
            'recommendation_cta' => [
                'ar' => 'ابنِ محرك حركة زيارات مجانية طويل الأجل. احجز تدقيق سيو.',
                'en' => 'Build a long-term organic traffic engine. Book an SEO audit.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $seoCat->id,
            'result_tier' => 2,
            'min_score' => 10,
            'max_score' => 13,
            'is_special_foundation' => false,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: نية البحث وتحسين المقالات',
                'en' => 'Quick Diagnosis: Search Intent & Article Optimization',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 2: إستراتيجية الكلمات المفتاحية وضبط نية البحث',
                'en' => 'Stage 2: Keyword Strategy & Search Intent Tuning',
            ],
            'current_diagnosis' => [
                'ar' => 'يتصدر موقعك للكلمات التوضيحية ولكنه يفتقر لزيارات المبيعات التحويلية.',
                'en' => 'Your site ranks for informational terms but misses transactional traffic.',
            ],
            'technical_analysis' => [
                'ar' => 'عمق المحتوى والروابط الداخلية تحتاجان للتعديل لنقل قوة الروابط.',
                'en' => 'Content depth and internal linking need tuning to pass link equity.',
            ],
            'recommendation_cta' => [
                'ar' => 'قم بتحسين المحتوى الحالي لتحويل قراء البحث إلى مكالمات مبيعات.',
                'en' => 'Optimize existing content to convert search readers into inbound calls.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $seoCat->id,
            'result_tier' => 3,
            'min_score' => 14,
            'max_score' => 18,
            'is_special_foundation' => false,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: الهيمنة على نتائج البحث وقيادة الفكر',
                'en' => 'Quick Diagnosis: Search Dominance & Thought Leadership',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 3: الهيمنة على السوق والمحتوى الرائد',
                'en' => 'Stage 3: Market Dominance & Pillar Content',
            ],
            'current_diagnosis' => [
                'ar' => 'يمتلك موقعك حركة زيارات مجانية ثابتة وسلطة نطاق قوية.',
                'en' => 'Your website commands steady organic traffic and strong domain authority.',
            ],
            'technical_analysis' => [
                'ar' => 'قم بتوسيع العناقيد المفهومية وإجراء أبحاث المجال لاستحواذ الكلمات المتبقية.',
                'en' => 'Expand topic clusters and conduct industry research to capture remaining terms.',
            ],
            'recommendation_cta' => [
                'ar' => 'حدد موعد اجتماع توسيع السيو المتقدم للهيمنة على الكلمات المنافسة.',
                'en' => 'Schedule an advanced SEO scaling meeting to dominate competitive keywords.',
            ],
        ]);

        DiagnosticRule::create([
            'assessment_category_id' => $seoCat->id,
            'result_tier' => 4,
            'min_score' => 0,
            'max_score' => 0,
            'is_special_foundation' => true,
            'preliminary_teaser' => [
                'ar' => 'تشخيص سريع: الأرشفة الأولية وخارطة طريق الكلمات المفتاحية',
                'en' => 'Quick Diagnosis: Initial Indexing & Keyword Roadmap',
            ],
            'stage_title' => [
                'ar' => 'المرحلة 4: بنية السيو ما قبل الإطلاق',
                'en' => 'Stage 4: Pre-Launch SEO Architecture',
            ],
            'current_diagnosis' => [
                'ar' => 'يتم حالياً إطلاق موقعك أو تجديده.',
                'en' => 'Your site is being launched or revamped.',
            ],
            'technical_analysis' => [
                'ar' => 'بناء عناوين URL وهياكل الأقسام قبل الأرشفة يضمن التصدر السريع.',
                'en' => 'Building URL structures and SILO categories prior to indexation ensures fast ranking.',
            ],
            'recommendation_cta' => [
                'ar' => 'احصل على مخطط بنية السيو قبل الإطلاق الرسمي.',
                'en' => 'Get a pre-launch SEO architecture blueprint before pushing live.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $seoCat->id,
            'color_tag' => 'red',
            'cta_text' => [
                'ar' => 'بناءً على هدفك لكسب عملاء دون هدر الميزانية الإعلانية، فإن التصدر للكلمات التحويلية سيجلب لك عملاء مستهدفين بانتظام. احجز جلسة خارطة طريق السيو.',
                'en' => 'Based on your goal to acquire leads without ad burn, ranking for high-intent transactional keywords will deliver consistent inbound leads. Schedule your SEO roadmap session.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $seoCat->id,
            'color_tag' => 'yellow',
            'cta_text' => [
                'ar' => 'بناءً على هدفك لبناء سلطة مؤسسية، فإن نشر تقارير البحوث والأوراق البيضاء سيضع علامتك كقائد في المجال. احجز استشارة محتوى السلطة.',
                'en' => 'Based on your goal to establish corporate authority, publishing research reports and whitepapers will position your brand as an industry leader. Book an authority content consultation.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $seoCat->id,
            'color_tag' => 'green',
            'cta_text' => [
                'ar' => 'بناءً على هدفك لتحويل مدونتك إلى مركز معرفي، فإن تنظيم محرك محتوى قابل للتوسع يبقي الزوار لفترة أطول. تحدث إلى فريق تحرير السيو لدينا.',
                'en' => 'Based on your goal to turn your blog into a knowledge hub, structuring a scalable content engine keeps visitors engaged longer. Talk to our SEO editorial team.',
            ],
        ]);

        GoalCta::create([
            'assessment_category_id' => $seoCat->id,
            'color_tag' => 'blue',
            'cta_text' => [
                'ar' => 'بناءً على هدفك لتقليل التكاليف التسويقية، فإن التحسين المستمر للبحث المجاني يقدم بديلاً عالياً في عائد الاستثمار مقارنة بالإعلانات الدائمة. احصل على استشارتك الإستراتيجية.',
                'en' => 'Based on your goal to reduce marketing overhead, continuous organic search optimization offers a high ROI alternative to perpetual ad spend. Claim your strategy call.',
            ],
        ]);

        $sq1 = Question::create([
            'assessment_category_id' => $seoCat->id,
            'question_number' => 1,
            'text' => [
                'ar' => 'كيف يجذب موقعك الإلكتروني الزوار حالياً؟',
                'en' => 'How does your website currently attract visitors?',
            ],
            'is_goal_question' => false,
        ]);

        QuestionOption::create(['question_id' => $sq1->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'كلياً تقريباً عبر الإعلانات المدفوعة', 'en' => 'Almost entirely through paid ads']]);
        QuestionOption::create(['question_id' => $sq1->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'بعض حركة الزيارات المجانية، وغالباً توضيحية', 'en' => 'Some organic traffic, mostly informational']]);
        QuestionOption::create(['question_id' => $sq1->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'حضور قوي جداً في محركات البحث', 'en' => 'Strong organic search presence']]);
        QuestionOption::create(['question_id' => $sq1->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'تم إطلاق الموقع للتو، لا توجد زيارات بعد', 'en' => 'Website just launched, no traffic yet']]);

        $sq2 = Question::create([
            'assessment_category_id' => $seoCat->id,
            'question_number' => 2,
            'text' => [
                'ar' => 'ما مدى نجاح محتواك في استهداف كلمات مفتاحية محددة؟',
                'en' => 'How well does your content target specific search keywords?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $sq2->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'لا توجد إستراتيجية كلمات، مواضيع عشوائية', 'en' => 'No keyword strategy, random topics']]);
        QuestionOption::create(['question_id' => $sq2->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'بعض الكلمات، ولكن دون تحسين', 'en' => 'Some keywords, but not optimized']]);
        QuestionOption::create(['question_id' => $sq2->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'استهداف كلمات مبني على تحليل البيانات', 'en' => 'Data-driven keyword targeting']]);
        QuestionOption::create(['question_id' => $sq2->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو أبحاث الكلمات المفتاحية', 'en' => 'Just started researching keywords']]);

        $sq3 = Question::create([
            'assessment_category_id' => $seoCat->id,
            'question_number' => 3,
            'text' => [
                'ar' => 'كيف تقيم السيو الداخلي (العناوين، الوصف، والترويسات)؟',
                'en' => 'How would you rate your on-page SEO (titles, meta descriptions, headers)?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $sq3->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'ضعيف أو مفقود في معظم الصفحات', 'en' => 'Poor or missing on most pages']]);
        QuestionOption::create(['question_id' => $sq3->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'سيو أساسي وغير منتظم', 'en' => 'Basic SEO, inconsistent']]);
        QuestionOption::create(['question_id' => $sq3->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'محسّن في جميع الصفحات الرئيسية', 'en' => 'Optimized on all key pages']]);
        QuestionOption::create(['question_id' => $sq3->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'لم يتم تطبيقه بعد', 'en' => 'Not yet implemented']]);

        $sq4 = Question::create([
            'assessment_category_id' => $seoCat->id,
            'question_number' => 4,
            'text' => [
                'ar' => 'ما مدى قوة هيكلية الروابط الداخلية لديك؟',
                'en' => 'How strong is your internal linking structure?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $sq4->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'لا يواجد ربط مدروس بين الصفحات', 'en' => 'No deliberate linking']]);
        QuestionOption::create(['question_id' => $sq4->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'بعض الروابط ولكن بشكل غير إستراتيجي', 'en' => 'Some links, but not strategic']]);
        QuestionOption::create(['question_id' => $sq4->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'بنية ربط داخلي قوية ومنظمة (SILO)', 'en' => 'Strong silo architecture']]);
        QuestionOption::create(['question_id' => $sq4->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'بدأنا للتو في ربط المقالات', 'en' => 'Just started linking articles']]);

        $sq5 = Question::create([
            'assessment_category_id' => $seoCat->id,
            'question_number' => 5,
            'text' => [
                'ar' => 'كيف تقوم بتتبع الروابط الخلفية (Backlinks) وسلطة النطاق؟',
                'en' => 'How do you track backlinks and domain authority?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $sq5->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'لا توجد إستراتيجية روابط خلفية على الإطلاق', 'en' => 'No backlink strategy at all']]);
        QuestionOption::create(['question_id' => $sq5->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'بعض الروابط الطبيعية غير المتبعة', 'en' => 'Some organic links, untracked']]);
        QuestionOption::create(['question_id' => $sq5->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'حملات بناء روابط ومراقبة مستمرة', 'en' => 'Active outreach and monitoring']]);
        QuestionOption::create(['question_id' => $sq5->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'لا نركز على الروابط في الوقت الحالي', 'en' => 'Not focusing on links yet']]);

        $sq6 = Question::create([
            'assessment_category_id' => $seoCat->id,
            'question_number' => 6,
            'text' => [
                'ar' => 'كم مرة تنشر محتوى جديداً محسّناً لمحركات البحث؟',
                'en' => 'How often do you publish new SEO-optimized content?',
            ],
            'is_goal_question' => false,
        ]);
        QuestionOption::create(['question_id' => $sq6->id, 'color_tag' => 'red', 'score_weight' => 1, 'text' => ['ar' => 'نادراً أو أبداً', 'en' => 'Rarely or never']]);
        QuestionOption::create(['question_id' => $sq6->id, 'color_tag' => 'yellow', 'score_weight' => 2, 'text' => ['ar' => 'مرات قليلة في الشهر', 'en' => 'A few times a month']]);
        QuestionOption::create(['question_id' => $sq6->id, 'color_tag' => 'green', 'score_weight' => 3, 'text' => ['ar' => 'عدة مرات في الأسبوع', 'en' => 'Multiple times per week']]);
        QuestionOption::create(['question_id' => $sq6->id, 'color_tag' => 'blue', 'score_weight' => 2, 'text' => ['ar' => 'أطلقنا المدونة للتو', 'en' => 'Just launched the blog']]);

        $sq7 = Question::create([
            'assessment_category_id' => $seoCat->id,
            'question_number' => 7,
            'text' => [
                'ar' => 'ما هو هدفك الرئيسي من تحسين محركات البحث (SEO)؟',
                'en' => 'What is your primary SEO goal?',
            ],
            'is_goal_question' => true,
        ]);
        QuestionOption::create(['question_id' => $sq7->id, 'color_tag' => 'red', 'score_weight' => 0, 'text' => ['ar' => 'جلب عملاء بدون ميزانية إعلانات', 'en' => 'Acquire leads without ad spend']]);
        QuestionOption::create(['question_id' => $sq7->id, 'color_tag' => 'yellow', 'score_weight' => 0, 'text' => ['ar' => 'تأسيس سلطة تجارية للمؤسسة', 'en' => 'Establish corporate authority']]);
        QuestionOption::create(['question_id' => $sq7->id, 'color_tag' => 'green', 'score_weight' => 0, 'text' => ['ar' => 'تحويل المدونة إلى مركز معرفي', 'en' => 'Turn blog into a knowledge hub']]);
        QuestionOption::create(['question_id' => $sq7->id, 'color_tag' => 'blue', 'score_weight' => 0, 'text' => ['ar' => 'تقليل النفقات التسويقية العامة', 'en' => 'Reduce marketing overhead']]);

        // =========================================================================
// TRACK 4: Web Design & Development
// =========================================================================
$webCat = AssessmentCategory::create([
    'slug' => 'web-development',
    'title' => [
        'en' => 'Web Design & Conversion Optimization (CRO)',
        'ar' => 'تصميم المواقع وتحسين معدل التحويل (CRO)',
    ],
    'description' => [
        'en' => 'Evaluate website UX/UI speed, mobile responsiveness, and checkout conversion rates.',
        'ar' => 'تقييم سرعة واجهة وتجربة المستخدم للموقع، التوافق مع الهواتف المحمولة، ومعدلات التحويل عند الدفع.',
    ],
]);

DiagnosticRule::create([
    'assessment_category_id' => $webCat->id,
    'result_tier' => 1,
    'min_score' => 6,
    'max_score' => 9,
    'is_special_foundation' => false,
    'preliminary_teaser' => [
        'en' => 'Quick Diagnosis: UX Performance & Mobile Speed Upgrade',
        'ar' => 'تشخيص سريع: ترقية أداء تجربة المستخدم وسرعة الجوال',
    ],
    'stage_title' => [
        'en' => 'Stage 1: Speed Performance & Mobile UX Refactor',
        'ar' => 'المرحلة 1: تحسين أداء السرعة وتجربة المستخدم للجوال',
    ],
    'current_diagnosis' => [
        'en' => 'Your website experiences high bounce rates due to slow mobile loading.',
        'ar' => 'يعاني موقعك من معدلات ارتداد عالية بسبب بطء التحميل على الهواتف المحمولة.',
    ],
    'technical_analysis' => [
        'en' => 'Page load speed exceeds 3.5 seconds on mobile networks.',
        'ar' => 'تتجاوز سرعة تحميل الصفحة 3.5 ثانية على شبكات الجوال.',
    ],
    'recommendation_cta' => [
        'en' => 'Refactor your frontend performance and mobile layout to capture lost traffic.',
        'ar' => 'إعادة هيكلة أداء الواجهة الأمامية وتصميم الجوال لاستعادة الزيارات المفقودة.',
    ],
]);

DiagnosticRule::create([
    'assessment_category_id' => $webCat->id,
    'result_tier' => 2,
    'min_score' => 10,
    'max_score' => 13,
    'is_special_foundation' => false,
    'preliminary_teaser' => [
        'en' => 'Quick Diagnosis: Conversion Funnel & Pixel Tracking Tuning',
        'ar' => 'تشخيص سريع: ضبط مسار التحويل وتتبع البكسل (Pixel)',
    ],
    'stage_title' => [
        'en' => 'Stage 2: Conversion Rate Optimization (CRO) & Tracking',
        'ar' => 'المرحلة 2: تحسين معدل التحويل (CRO) والتتبع',
    ],
    'current_diagnosis' => [
        'en' => 'Your site drives decent traffic but suffers from checkout drop-offs.',
        'ar' => 'يجلب موقعك زيارات جيدة ولكنه يعاني من انسحاب المستخدمين عند صفحة الدفع.',
    ],
    'technical_analysis' => [
        'en' => 'Conversion leakage occurs at checkout; analytics pixels are misconfigured.',
        'ar' => 'يحدث تسرب في معدل التحويل أثناء عملية الدفع، مع عدم ضبط بكسلات التحليل بشكل صحيح.',
    ],
    'recommendation_cta' => [
        'en' => 'Streamline your checkout journey and fix pixel event tracking.',
        'ar' => 'تبسيط رحلة إتمام الشراء وإصلاح تتبع الأحداث عبر البكسل.',
    ],
]);

DiagnosticRule::create([
    'assessment_category_id' => $webCat->id,
    'result_tier' => 3,
    'min_score' => 14,
    'max_score' => 18,
    'is_special_foundation' => false,
    'preliminary_teaser' => [
        'en' => 'Quick Diagnosis: Scalable Architecture & A/B Testing',
        'ar' => 'تشخيص سريع: بنية تحتية قابلة للتوسع واختبارات A/B',
    ],
    'stage_title' => [
        'en' => 'Stage 3: Enterprise Web Infrastructure & A/B Scaling',
        'ar' => 'المرحلة 3: البنية التحتية المتقدمة للمواقع وتوسع اختبارات A/B',
    ],
    'current_diagnosis' => [
        'en' => 'Your web platform is fast, responsive, and well-integrated.',
        'ar' => 'منصتك الإلكترونية سريعة، متجاوبة، ومترابطة بشكل ممتاز.',
    ],
    'technical_analysis' => [
        'en' => 'Next growth includes automated client dashboards and custom API integrations.',
        'ar' => 'تتضمن مرحلة النمو التالية لوحات تحكم مؤتمدة للعملاء وتكاملات برمجية (API) مخصصة.',
    ],
    'recommendation_cta' => [
        'en' => 'Book an enterprise architecture consultation for custom features.',
        'ar' => 'احجز استشارة للبنية التحتية المتقدمة لبناء ميزات مخصصة.',
    ],
]);

DiagnosticRule::create([
    'assessment_category_id' => $webCat->id,
    'result_tier' => 4,
    'min_score' => 0,
    'max_score' => 0,
    'is_special_foundation' => true,
    'preliminary_teaser' => [
        'en' => 'Quick Diagnosis: Turnkey Platform Build Phase',
        'ar' => 'تشخيص سريع: مرحلة بناء منصة متكاملة جاهزة للاستخدام',
    ],
    'stage_title' => [
        'en' => 'Stage 4: Turnkey Web Platform Development',
        'ar' => 'المرحلة 4: تطوير منصة ويب متكاملة (Turnkey)',
    ],
    'current_diagnosis' => [
        'en' => 'Your business needs a high-converting digital storefront.',
        'ar' => 'يحتاج عملك إلى واجهة رقمية متجر إلكتروني عالي التحويل.',
    ],
    'technical_analysis' => [
        'en' => 'Building on a clean Laravel/Inertia stack guarantees ultra-fast response times.',
        'ar' => 'البناء باستخدام بيئة Laravel/Inertia يضمن أوقات استجابة فائقة السرعة.',
    ],
    'recommendation_cta' => [
        'en' => 'Get a complete project scope and UI mockups for your upcoming web platform.',
        'ar' => 'احصل على نطاق مشروع كامل ونماذج واجهة المستخدم منصتك القادمة.',
    ],
]);

GoalCta::create([
    'assessment_category_id' => $webCat->id,
    'color_tag' => 'red',
    'cta_text' => [
        'en' => 'Based on your goal to increase online sales immediately, optimizing your sales landing page UX will instantly boost checkout conversions. Schedule a web CRO audit.',
        'ar' => 'بناءً على هدفك لزيادة المبيعات عبر الإنترنت فوراً، فإن تحسين تجربة المستخدم لصفحة الهبوط سيزيد من تحويلات الشراء فوراً. احجز تدقيقاً لتحسين معدل التحويل (CRO).',
    ],
]);

GoalCta::create([
    'assessment_category_id' => $webCat->id,
    'color_tag' => 'yellow',
    'cta_text' => [
        'en' => 'Based on your goal to position as an elite market player, a bespoke design with fluid animations will give clients instant trust. Schedule a design consultation.',
        'ar' => 'بناءً على هدفك للظهور كلاعب رائد في السوق، فإن التصميم المخصص ذو التفاعلات السلسة سيعطي العملاء ثقة فورية. احجز استشارة تصميم.',
    ],
]);

GoalCta::create([
    'assessment_category_id' => $webCat->id,
    'color_tag' => 'green',
    'cta_text' => [
        'en' => 'Based on your goal to automate customer orders, building a self-service client portal will streamline fulfillment 24/7. Book a portal architecture call.',
        'ar' => 'بناءً على هدفك لأتمتة طلبات العملاء، فإن إنشاء بوابة خدمة ذاتية للعملاء سيسهل تنفيذ الطلبات على مدار الساعة. احجز جلسة لتخطيط بنية البوابة.',
    ],
]);

GoalCta::create([
    'assessment_category_id' => $webCat->id,
    'color_tag' => 'blue',
    'cta_text' => [
        'en' => 'Based on your goal for an easy-to-manage platform, we build custom admin dashboards allowing your team to update content effortlessly without coding. Schedule a demo.',
        'ar' => 'بناءً على هدفك للحصول على منصة سهلة الإدارة، نقوم ببناء لوحات تحكم مخصصة تتيح لفريقك تحديث المحتوى بسهولة وبدون برمجة. احجز عرضاً توضيحياً.',
    ],
]);

$wq1 = Question::create([
    'assessment_category_id' => $webCat->id,
    'question_number' => 1,
    'text' => [
        'en' => 'How would you describe your current website?',
        'ar' => 'كيف تصف موقعك الإلكتروني الحالي؟',
    ],
    'is_goal_question' => false,
]);

QuestionOption::create([
    'question_id' => $wq1->id,
    'color_tag' => 'red',
    'score_weight' => 1,
    'text' => [
        'en' => 'Slow, not mobile-friendly, high bounce rate',
        'ar' => 'بطيء، غير متوافق مع الهواتف، ومعدل الارتداد مرتفع',
    ],
]);
QuestionOption::create([
    'question_id' => $wq1->id,
    'color_tag' => 'yellow',
    'score_weight' => 2,
    'text' => [
        'en' => 'Functional but outdated design',
        'ar' => 'يعمل بشكل جيد ولكن بتصميم قديم',
    ],
]);
QuestionOption::create([
    'question_id' => $wq1->id,
    'color_tag' => 'green',
    'score_weight' => 3,
    'text' => [
        'en' => 'Modern, fast, responsive, converting well',
        'ar' => 'حديث، سريع، متجاوب، ويحقق معدل تحويل ممتاز',
    ],
]);
QuestionOption::create([
    'question_id' => $wq1->id,
    'color_tag' => 'blue',
    'score_weight' => 2,
    'text' => [
        'en' => 'Just built or about to launch',
        'ar' => 'تم إنشاؤه مؤخراً أو على وشك الإطلاق',
    ],
]);

$wq2 = Question::create([
    'assessment_category_id' => $webCat->id,
    'question_number' => 2,
    'text' => [
        'en' => 'How fast does your website load on mobile devices?',
        'ar' => 'ما مدى سرعة تحميل موقعك الإلكتروني على أجهزة الجوال؟',
    ],
    'is_goal_question' => false,
]);
QuestionOption::create([
    'question_id' => $wq2->id,
    'color_tag' => 'red',
    'score_weight' => 1,
    'text' => [
        'en' => 'Over 4 seconds, high bounce rate',
        'ar' => 'أكثر من 4 ثوانٍ، مع نسبة مغادرة عالية',
    ],
]);
QuestionOption::create([
    'question_id' => $wq2->id,
    'color_tag' => 'yellow',
    'score_weight' => 2,
    'text' => [
        'en' => '3-4 seconds, average',
        'ar' => 'من 3 إلى 4 ثوانٍ، متوسط',
    ],
]);
QuestionOption::create([
    'question_id' => $wq2->id,
    'color_tag' => 'green',
    'score_weight' => 3,
    'text' => [
        'en' => 'Under 2 seconds, excellent',
        'ar' => 'أقل من ثانتين، ممتاز جداً',
    ],
]);
QuestionOption::create([
    'question_id' => $wq2->id,
    'color_tag' => 'blue',
    'score_weight' => 2,
    'text' => [
        'en' => 'Not yet tested or optimized',
        'ar' => 'لم يتم اختباره أو تحسينه بعد',
    ],
]);

$wq3 = Question::create([
    'assessment_category_id' => $webCat->id,
    'question_number' => 3,
    'text' => [
        'en' => 'How intuitive is your website navigation and user flow?',
        'ar' => 'ما مدى سهولة وسلاسة التنقل وتجربة المستخدم في موقعك؟',
    ],
    'is_goal_question' => false,
]);
QuestionOption::create([
    'question_id' => $wq3->id,
    'color_tag' => 'red',
    'score_weight' => 1,
    'text' => [
        'en' => 'Confusing, users get lost',
        'ar' => 'مربك، والمستخدمون يواجهون صعوبة في الوصول للمطلوب',
    ],
]);
QuestionOption::create([
    'question_id' => $wq3->id,
    'color_tag' => 'yellow',
    'score_weight' => 2,
    'text' => [
        'en' => 'Functional but not ideal',
        'ar' => 'مقبول ولكنه ليس مثالياً',
    ],
]);
QuestionOption::create([
    'question_id' => $wq3->id,
    'color_tag' => 'green',
    'score_weight' => 3,
    'text' => [
        'en' => 'Intuitive, users find what they need easily',
        'ar' => 'سلس للغاية، يجد المستخدمون ما يحتاجونه بسبولة',
    ],
]);
QuestionOption::create([
    'question_id' => $wq3->id,
    'color_tag' => 'blue',
    'score_weight' => 2,
    'text' => [
        'en' => 'Basic structure, still refining',
        'ar' => 'بنية أساسية، وما زال قيد التحسين',
    ],
]);

$wq4 = Question::create([
    'assessment_category_id' => $webCat->id,
    'question_number' => 4,
    'text' => [
        'en' => 'How well does your website convert visitors into leads or sales?',
        'ar' => 'ما مدى نجاح موقعك في تحويل الزوار إلى عملاء محتملين أو مبيعات؟',
    ],
    'is_goal_question' => false,
]);
QuestionOption::create([
    'question_id' => $wq4->id,
    'color_tag' => 'red',
    'score_weight' => 1,
    'text' => [
        'en' => 'Poor conversion, high drop-offs',
        'ar' => 'تحويل ضعيف، ونسبة انسحاب عالية للزوار',
    ],
]);
QuestionOption::create([
    'question_id' => $wq4->id,
    'color_tag' => 'yellow',
    'score_weight' => 2,
    'text' => [
        'en' => 'Average, some conversions',
        'ar' => 'متوسط، مع وجود بعض التحويلات',
    ],
]);
QuestionOption::create([
    'question_id' => $wq4->id,
    'color_tag' => 'green',
    'score_weight' => 3,
    'text' => [
        'en' => 'Strong conversion rate',
        'ar' => 'معدل تحويل قوي وممتاز',
    ],
]);
QuestionOption::create([
    'question_id' => $wq4->id,
    'color_tag' => 'blue',
    'score_weight' => 2,
    'text' => [
        'en' => 'No clear conversion tracking yet',
        'ar' => 'لا يوجد تتبع واضح لمعدل التحويل بعد',
    ],
]);

$wq5 = Question::create([
    'assessment_category_id' => $webCat->id,
    'question_number' => 5,
    'text' => [
        'en' => 'Do you have analytics and pixel tracking properly configured?',
        'ar' => 'هل تم إعداد تحليلات أدوات التتبع (Pixel) بشكل صحيح؟',
    ],
    'is_goal_question' => false,
]);
QuestionOption::create([
    'question_id' => $wq5->id,
    'color_tag' => 'red',
    'score_weight' => 1,
    'text' => [
        'en' => 'No tracking at all',
        'ar' => 'لا يوجد تتبع نهائياً',
    ],
]);
QuestionOption::create([
    'question_id' => $wq5->id,
    'color_tag' => 'yellow',
    'score_weight' => 2,
    'text' => [
        'en' => 'Basic tracking, incomplete events',
        'ar' => 'تتبع أساسي، مع أحداث (Events) غير مكتملة',
    ],
]);
QuestionOption::create([
    'question_id' => $wq5->id,
    'color_tag' => 'green',
    'score_weight' => 3,
    'text' => [
        'en' => 'Full event tracking configured',
        'ar' => 'تم ضبط تتبع الأحداث بالكامل بنجاح',
    ],
]);
QuestionOption::create([
    'question_id' => $wq5->id,
    'color_tag' => 'blue',
    'score_weight' => 2,
    'text' => [
        'en' => 'Just installed basic analytics',
        'ar' => 'تم تثبيت أدوات التحليل الأساسية مؤخراً',
    ],
]);

$wq6 = Question::create([
    'assessment_category_id' => $webCat->id,
    'question_number' => 6,
    'text' => [
        'en' => 'How often do you update and maintain your website?',
        'ar' => 'ما مدى تكرار تحديث وصيانة موقعك الإلكتروني؟',
    ],
    'is_goal_question' => false,
]);
QuestionOption::create([
    'question_id' => $wq6->id,
    'color_tag' => 'red',
    'score_weight' => 1,
    'text' => [
        'en' => 'Rarely, outdated content',
        'ar' => 'نادراً، والمحتوى قديم',
    ],
]);
QuestionOption::create([
    'question_id' => $wq6->id,
    'color_tag' => 'yellow',
    'score_weight' => 2,
    'text' => [
        'en' => 'Occasional updates',
        'ar' => 'تحديثات بين الحين والآخر',
    ],
]);
QuestionOption::create([
    'question_id' => $wq6->id,
    'color_tag' => 'green',
    'score_weight' => 3,
    'text' => [
        'en' => 'Regular updates and maintenance',
        'ar' => 'تحديثات وصيانة دورية ومنتظمة',
    ],
]);
QuestionOption::create([
    'question_id' => $wq6->id,
    'color_tag' => 'blue',
    'score_weight' => 2,
    'text' => [
        'en' => 'Brand new, no updates needed yet',
        'ar' => 'جديد تماماً، لا يحتاج لتحديثات بعد',
    ],
]);

$wq7 = Question::create([
    'assessment_category_id' => $webCat->id,
    'question_number' => 7,
    'text' => [
        'en' => 'What is your primary website goal?',
        'ar' => 'ما هو هدفك الرئيسي من الموقع الإلكتروني؟',
    ],
    'is_goal_question' => true,
]);
QuestionOption::create([
    'question_id' => $wq7->id,
    'color_tag' => 'red',
    'score_weight' => 0,
    'text' => [
        'en' => 'Increase online sales immediately',
        'ar' => 'زيادة المبيعات عبر الإنترنت فوراً',
    ],
]);
QuestionOption::create([
    'question_id' => $wq7->id,
    'color_tag' => 'yellow',
    'score_weight' => 0,
    'text' => [
        'en' => 'Position as an elite market player',
        'ar' => 'الظهور كلاعب رائد واحترافي في السوق',
    ],
]);
QuestionOption::create([
    'question_id' => $wq7->id,
    'color_tag' => 'green',
    'score_weight' => 0,
    'text' => [
        'en' => 'Automate customer orders',
        'ar' => 'أتمتة طلبات العملات بشكل كامل',
    ],
]);
QuestionOption::create([
    'question_id' => $wq7->id,
    'color_tag' => 'blue',
    'score_weight' => 0,
    'text' => [
        'en' => 'Easy-to-manage platform',
        'ar' => 'منصة سهلة الإدارة والتحكم',
    ],
]);
    }
}