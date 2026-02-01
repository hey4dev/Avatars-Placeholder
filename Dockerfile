# نسخه سبک نود
FROM node:20-alpine

# دایرکتوری داخل کانتینر
WORKDIR /app

# فقط فایل‌های dependency رو اول کپی می‌کنیم برای cache بهتر
COPY back-end/package*.json ./

# نصب dependency ها
RUN npm install --production

# بقیه سورس کد
COPY back-end .

# پورت اپ (بسته به پروژه‌ات ممکنه فرق کنه)
EXPOSE 3000

# اجرای برنامه
CMD ["npm", "start"]
