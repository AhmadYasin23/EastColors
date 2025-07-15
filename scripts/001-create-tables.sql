-- Create contacts table for form submissions
CREATE TABLE IF NOT EXISTS contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  company VARCHAR(255),
  service_type VARCHAR(100),
  message TEXT,
  language VARCHAR(2) DEFAULT 'ar',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'new'
);

-- Create newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  language VARCHAR(2) DEFAULT 'ar',
  subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(20) DEFAULT 'active'
);

-- Create projects table for portfolio
CREATE TABLE IF NOT EXISTS projects (
  id SERIAL PRIMARY KEY,
  title_ar VARCHAR(255) NOT NULL,
  title_en VARCHAR(255) NOT NULL,
  description_ar TEXT,
  description_en TEXT,
  category VARCHAR(50) NOT NULL,
  image_url VARCHAR(500),
  client_name VARCHAR(255),
  completion_date DATE,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id SERIAL PRIMARY KEY,
  client_name_ar VARCHAR(255) NOT NULL,
  client_name_en VARCHAR(255) NOT NULL,
  company_ar VARCHAR(255),
  company_en VARCHAR(255),
  testimonial_ar TEXT NOT NULL,
  testimonial_en TEXT NOT NULL,
  rating INTEGER DEFAULT 5,
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO testimonials (client_name_ar, client_name_en, company_ar, company_en, testimonial_ar, testimonial_en, rating, featured) VALUES
('أحمد محمد', 'Ahmed Mohammed', 'شركة النور التجارية', 'Al Noor Trading Company', 'خدمة ممتازة وجودة عالية في التنفيذ. فريق محترف ومتعاون، وأسعار مناسبة. أنصح بالتعامل معهم.', 'Excellent service and high quality execution. Professional and cooperative team, with reasonable prices. I recommend dealing with them.', 5, true),
('فاطمة العلي', 'Fatima Al Ali', 'مطاعم الذوق الرفيع', 'Fine Taste Restaurants', 'تعاملت معهم في تصميم هوية مطاعمنا واللوحات الإعلانية. النتيجة فاقت توقعاتي بكثير.', 'I worked with them on designing our restaurant identity and signage. The result exceeded my expectations by far.', 5, true),
('خالد السعد', 'Khalid Al Saad', 'مجموعة الخليج للاستثمار', 'Gulf Investment Group', 'شركة موثوقة وملتزمة بالمواعيد. جودة العمل عالية والأسعار تنافسية. تجربة ممتازة.', 'A reliable company that is committed to deadlines. High quality work and competitive prices. Excellent experience.', 5, true);
