const i18n = {
  en: { code: "EN", label: "English" },
  zh: { code: "中文", label: "中文" },
  ru: { code: "RU", label: "Русский" }
};

const translations = {
  // Navigation
  "nav-inventory": { en: "Inventory", zh: "库存车辆", ru: "Автомобили" },
  "nav-services": { en: "Services", zh: "服务", ru: "Услуги" },
  "nav-process": { en: "How It Works", zh: "流程", ru: "Как это работает" },
  "nav-about": { en: "About", zh: "关于我们", ru: "О нас" },
  "nav-cta": { en: "Get a Quote", zh: "获取报价", ru: "Получить предложение" },

  // Hero
  "hero-badge": { en: "Premium Used Car Export", zh: "优质二手车出口", ru: "Экспорт премиальных автомобилей" },
  "hero-title": { en: "Quality Vehicles,<br><span class=\"text-accent\">Global Delivery</span>", zh: "优质车辆，<br><span class=\"text-accent\">全球送达</span>", ru: "Качественные авто,<br><span class=\"text-accent\">Доставка по всему миру</span>" },
  "hero-desc": { en: "Trusted exporter of pre-owned vehicles from China to markets worldwide. Every car inspected, certified, and ready for export.", zh: "值得信赖的二手车出口商，从中国发往全球。每辆车都经过检测认证，随时准备出口。", ru: "Надежный экспортер подержанных автомобилей из Китая на рынки по всему миру. Каждый автомобиль проверен и сертифицирован." },
  "hero-btn1": { en: "Browse Inventory", zh: "浏览库存", ru: "Посмотреть автомобили" },
  "hero-btn2": { en: "Contact Us", zh: "联系我们", ru: "Связаться с нами" },

  // Stats
  "stat-vehicles": { en: "Vehicles Exported", zh: "已出口车辆", ru: "Автомобилей экспортировано" },
  "stat-countries": { en: "Countries Served", zh: "覆盖国家", ru: "Стран обслуживания" },
  "stat-experience": { en: "Years Experience", zh: "年经验", ru: "Лет опыта" },
  "stat-satisfaction": { en: "Client Satisfaction", zh: "客户满意度", ru: "Удовлетворенность клиентов" },

  // Inventory section
  "inv-tag": { en: "Featured Vehicles", zh: "精选车辆", ru: "Рекомендуемые автомобили" },
  "inv-title": { en: "Current Inventory", zh: "当前库存", ru: "Текущий ассортимент" },
  "inv-desc": { en: "Hand-picked vehicles ready for immediate export. All prices are FOB (Free on Board).", zh: "精选车辆，随时可出口。所有价格为离岸价（FOB）。", ru: "Отобранные автомобили, готовые к немедленному экспорту. Все цены указаны на условиях FOB." },
  "inv-footer": { en: "Request Full Inventory List", zh: "获取完整库存清单", ru: "Запросить полный список" },
  "inv-inquire": { en: "Inquire", zh: "询价", ru: "Запрос" },
  "inv-details": { en: "Details", zh: "详情", ru: "Подробнее" },

  // Services
  "svc-tag": { en: "What We Offer", zh: "服务内容", ru: "Наши услуги" },
  "svc-title": { en: "End-to-End Export Services", zh: "一站式出口服务", ru: "Полный комплекс услуг по экспорту" },
  "svc-desc": { en: "From vehicle sourcing to door-to-door delivery, we handle every step.", zh: "从车辆采购到门到门交付，我们处理每一个环节。", ru: "От поиска автомобиля до доставки до двери — мы берем на себя каждый шаг." },
  "svc1-title": { en: "Vehicle Sourcing", zh: "车辆采购", ru: "Поиск автомобилей" },
  "svc1-desc": { en: "Access to a wide network of auctions, dealerships, and direct owners across China. We find the exact make and model you need.", zh: "覆盖中国广泛的拍卖行、经销商和车主网络。为您找到精确的车型。", ru: "Доступ к широкой сети аукционов, дилеров и частных владельцев по всему Китаю." },
  "svc2-title": { en: "Quality Inspection", zh: "质量检测", ru: "Проверка качества" },
  "svc2-desc": { en: "Comprehensive 180-point inspection by certified mechanics. Detailed reports with photos included for every vehicle.", zh: "由认证技师进行180项全面检测。每辆车附带详细报告及照片。", ru: "Комплексная проверка по 180 пунктам сертифицированными механиками. Отчеты с фото для каждого авто." },
  "svc3-title": { en: "Shipping & Logistics", zh: "物流运输", ru: "Доставка и логистика" },
  "svc3-desc": { en: "RoRo and container shipping options to major ports worldwide. Full tracking and insurance included.", zh: "滚装船和集装箱运输到全球主要港口。全程追踪，含保险。", ru: "RoRo и контейнерные перевозки в крупнейшие порты мира. Полное отслеживание и страховка." },
  "svc4-title": { en: "Documentation", zh: "文件办理", ru: "Документация" },
  "svc4-desc": { en: "Complete paperwork handled: export certificates, customs clearance, bill of lading, and import compliance support.", zh: "全套文件办理：出口证书、报关、提单及进口合规支持。", ru: "Полный пакет документов: сертификаты, таможня, коносамент. Поддержка импорта." },
  "svc5-title": { en: "After-Sales Support", zh: "售后支持", ru: "Послепродажная поддержка" },
  "svc5-desc": { en: "Dedicated account manager from inquiry to delivery. Ongoing support for parts, maintenance, and repeat orders.", zh: "专属客户经理从询价到交付全程跟进。持续提供配件、维护和复购支持。", ru: "Персональный менеджер от запроса до доставки. Поддержка запчастей и повторных заказов." },
  "svc6-title": { en: "Bulk Orders", zh: "批量订购", ru: "Оптовые заказы" },
  "svc6-desc": { en: "Special pricing for container-load orders. Mix and match different models to fill a container and save on shipping.", zh: "整柜订单享受专属价格。多种车型混装，节省运费。", ru: "Специальные цены для контейнерных заказов. Комбинируйте модели для экономии." },

  // Process
  "proc-tag": { en: "Simple Process", zh: "简单流程", ru: "Простой процесс" },
  "proc-title": { en: "How It Works", zh: "操作流程", ru: "Как это работает" },
  "proc-desc": { en: "Four simple steps to get your vehicle delivered to your destination.", zh: "四个简单步骤，将车辆送达目的地。", ru: "Четыре простых шага для доставки автомобиля." },
  "step1-title": { en: "Select & Inquire", zh: "选择并询价", ru: "Выбор и запрос" },
  "step1-desc": { en: "Browse our inventory or tell us your requirements. We will source the perfect vehicle for your market.", zh: "浏览库存或告诉我们您的需求。我们将为您找到最合适的车辆。", ru: "Просмотрите ассортимент или укажите требования. Найдем идеальный автомобиль." },
  "step2-title": { en: "Inspect & Confirm", zh: "验车确认", ru: "Осмотр и подтверждение" },
  "step2-desc": { en: "Receive detailed inspection report, photos, and video. Confirm your order with deposit.", zh: "接收详细的检测报告、照片和视频。支付定金确认订单。", ru: "Получите отчет, фото и видео. Подтвердите заказ депозитом." },
  "step3-title": { en: "Payment & Documentation", zh: "付款与文件", ru: "Оплата и документы" },
  "step3-desc": { en: "Secure payment processed. We handle all export documentation and customs clearance.", zh: "安全支付。我们处理所有出口文件和报关手续。", ru: "Безопасная оплата. Оформление всех экспортных документов." },
  "step4-title": { en: "Shipping & Delivery", zh: "运输交付", ru: "Отгрузка и доставка" },
  "step4-desc": { en: "Vehicle shipped via RoRo or container. Track your shipment until it arrives at your port.", zh: "车辆通过滚装船或集装箱装运。全程追踪至目的港。", ru: "Отгрузка RoRo или контейнером. Отслеживание до порта назначения." },

  // About
  "about-tag": { en: "About Us", zh: "关于我们", ru: "О нас" },
  "about-title": { en: "Your Trusted Partner in Used Car Export", zh: "您值得信赖的二手车出口伙伴", ru: "Ваш надежный партнер по экспорту" },
  "about-p1": { en: "With over 8 years in the automotive export industry, Qiandu Auto has built a reputation for reliability, quality, and competitive pricing. We connect global buyers with China vast automotive market.", zh: "Qiandu Auto 拥有超过8年汽车出口经验，以可靠、优质和具有竞争力的价格赢得了良好声誉。我们将全球买家与中国庞大的汽车市场连接起来。", ru: "Более 8 лет в индустрии экспорта. Qiandu Auto заслужила репутацию надежности, качества и конкурентоспособных цен." },
  "about-p2": { en: "Our team conducts rigorous quality checks on every vehicle, ensures complete documentation, and manages logistics from pickup to port delivery. Whether you need one vehicle or a container load, we deliver.", zh: "我们的团队对每辆车进行严格的质量检查，确保文件齐全，管理从提车到港口交付的全套物流。无论您需要一辆车还是一整柜，我们都能交付。", ru: "Наша команда проводит строгие проверки, оформляет документы и управляет логистикой от забора до порта." },
  "about-feat1": { en: "Licensed & Compliant", zh: "资质齐全", ru: "Лицензировано" },
  "about-feat2": { en: "500+ Vehicles Exported", zh: "500+车辆出口", ru: "500+ авто экспортировано" },
  "about-feat3": { en: "Global Shipping Network", zh: "全球物流网络", ru: "Глобальная логистика" },
  "about-feat4": { en: "Dedicated Account Manager", zh: "专属客户经理", ru: "Персональный менеджер" },

  // Contact
  "contact-tag": { en: "Get In Touch", zh: "联系我们", ru: "Свяжитесь с нами" },
  "contact-title": { en: "Ready to Import?<br>Let's Talk.", zh: "准备进口？<br>与我们聊聊。", ru: "Готовы импортировать?<br>Давайте обсудим." },
  "contact-desc": { en: "Tell us what you are looking for and we will find the best options for your market.", zh: "告诉我们您的需求，我们将为您找到最佳选择。", ru: "Расскажите, что вам нужно, и мы найдем лучшие варианты." },
  "form-name": { en: "Your Name *", zh: "您的姓名 *", ru: "Ваше имя *" },
  "form-email": { en: "Email Address *", zh: "电子邮箱 *", ru: "Электронная почта *" },
  "form-country": { en: "Destination Country *", zh: "目的国家 *", ru: "Страна назначения *" },
  "form-interest": { en: "I am interested in", zh: "我感兴趣的是", ru: "Меня интересует" },
  "form-msg": { en: "Message *", zh: "留言 *", ru: "Сообщение *" },
  "form-submit": { en: "Send Inquiry", zh: "发送询盘", ru: "Отправить запрос" },
  "form-note": { en: "We will respond within 24 hours.", zh: "我们将在24小时内回复您。", ru: "Мы ответим в течение 24 часов." },
  "interest-opt0": { en: "Select an option...", zh: "请选择...", ru: "Выберите..." },
  "interest-opt1": { en: "Specific vehicle", zh: "具体车型", ru: "Конкретный автомобиль" },
  "interest-opt2": { en: "Vehicle category / type", zh: "车辆类别/类型", ru: "Категория автомобиля" },
  "interest-opt3": { en: "Bulk / container order", zh: "批量/整柜订购", ru: "Оптовый заказ" },
  "interest-opt4": { en: "Partnership inquiry", zh: "合作咨询", ru: "Запрос партнерства" },
  "interest-opt5": { en: "Other", zh: "其他", ru: "Другое" },

  // Footer
  "footer-brand": { en: "Professional used car export service from China to the world. Quality vehicles, trusted service, global reach.", zh: "专业的二手车出口服务商，从中国到全球。优质车辆，值得信赖的服务，覆盖全球。", ru: "Профессиональный экспорт подержанных авто из Китая. Качество, доверие, глобальный охват." },
  "footer-quick": { en: "Quick Links", zh: "快速链接", ru: "Быстрые ссылки" },
  "footer-service-title": { en: "Services", zh: "服务", ru: "Услуги" },
  "footer-contact-title": { en: "Contact", zh: "联系方式", ru: "Контакты" },
  "footer-copy": { en: "All rights reserved.", zh: "保留所有权利。", ru: "Все права защищены." },
};function switchLang(lang) {
  // 更新按钮状态
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  
  // 切换所有带 data-i18n 属性的元素
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (translations[key] && translations[key][lang]) {
      el.innerHTML = translations[key][lang];
    }
  });
  
  // 保存选择到localStorage
  localStorage.setItem('lang', lang);
}

// 页面加载时恢复语言选择
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('lang');
  if (saved && saved !== 'en') {
    switchLang(saved);
  }
});
