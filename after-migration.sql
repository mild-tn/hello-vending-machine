INSERT INTO "public"."product" ("id", "name", "images", "description", "price", "stock_quantity") VALUES
(1, 'Coca Cola', '["https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/3200651/pexels-photo-3200651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]', 'เครื่องดื่มอัดลมยอดนิยม ให้ความสดชื่น', 20.00, 2),
(2, 'Pepsi', '["https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/11659356/pexels-photo-11659356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]', 'เครื่องดื่มอัดลมที่รสชาติไม่เหมือนใคร', 18.00, 4),
(3, 'Lays Chips', '["https://images.pexels.com/photos/4061441/pexels-photo-4061441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]', 'ขนมขบเคี้ยวกรอบอร่อยหลายรสชาติ', 35.00, 6),
(4, 'Oreo', '["https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/28/89/8992760221028/8992760221028_1-20240923092253-.jpg"]', 'บิสกิตคุกกี้แซนด์วิชที่เหมาะกับทุกวัย', 25.00, 3),
(5, 'Red Bull', '["https://images.pexels.com/photos/793010/pexels-photo-793010.jpeg?auto=compress&cs=tinysrgb&w=800"]', 'เครื่องดื่มชูกำลังสำหรับเพิ่มพลังงาน', 15.00, 8),
(6, 'Sprite', '["https://example.com/images/sprite1.jpg", "https://example.com/images/sprite2.jpg"]', 'น้ำอัดลมกลิ่นมะนาว หวานซ่าเย็นใจ', 19.00, 5),
(7, 'KitKat', '["https://images.pexels.com/photos/8444548/pexels-photo-8444548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", "https://images.pexels.com/photos/1668245/pexels-photo-1668245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]', 'ช็อกโกแลตแท่งกรอบที่เหมาะกับการพักเบรค', 22.00, 5),
(8, 'Water Bottle', '["https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]', 'น้ำดื่มบริสุทธิ์ เหมาะสำหรับทุกโอกาส', 10.00, 1),
(9, 'Twix', '["https://images.pexels.com/photos/15781931/pexels-photo-15781931/free-photo-of-a-cup-of-coffee-and-a-chocolate-bar.jpeg?auto=compress&cs=tinysrgb&w=800", "https://media.istockphoto.com/id/2180016710/photo/caramel-chocolate-bar.jpg?b=1&s=612x612&w=0&k=20&c=UamvLhKxAAVrrkeDoCkdm7e0Dg8YuEE3QEjGbybHTRw=", "https://images.pexels.com/photos/16065067/pexels-photo-16065067/free-photo-of-bowl-with-sweets.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"]', 'ช็อกโกแลตแท่งสองชิ้นที่มีความกรอบและหวานมัน', 23.00, 3),
(10, 'Mars Bar', '["https://st.depositphotos.com/1024764/1717/i/450/depositphotos_17177023-stock-photo-mars-candy-chocolat-bar.jpg", "https://market.borong.com/product-images/677050979e20fc4a47559d51e4697691d28cd3d9.jpg", "https://assets.tops.co.th/MARS-MarsChocolate32g-0000093682923-1"]', 'ช็อกโกแลตแท่งพร้อมนูกัตและคาราเมล รสชาติเข้มข้น', 24.00, 2),
(11, 'Pringles', '["https://cdn.imweb.me/thumbnail/20240119/1bbf3fa09f9ce.jpg"]', 'มันฝรั่งทอดกรอบในกระป๋อง หลากหลายรสชาติ', 45.00, 5),
(12, 'M&M', '["https://down-th.img.susercontent.com/file/bf80124f2fddb4fc7ca5e141d91fb00c", "https://example.com/images/mms2.jpg", "https://www.newsnationnow.com/wp-content/uploads/sites/108/2023/01/MMsAP22021645371457.jpg?w=1280"]', 'ช็อกโกแลตเคลือบสีสันสดใส อร่อยในทุกคำ', 30.00, 7);

INSERT INTO branch ("location", "name", manager_name) VALUES
("Bangkok", "สาขา1", "Hello Name");

INSERT INTO machine ("name", branch_id) VALUES
("Blue Vening Machine", 1);

INSERT INTO "public"."customer" ("id", "name", "phone_number") VALUES
(1, 'John Smith', '095337294');

INSERT INTO product_machine (product_id, machine_id) VALUES
(1, 1),
(2, 1),
(3, 1),
(4, 1),
(5, 1),
(6, 1),
(7, 1),
(8, 1),
(9, 1),
(10, 1),
(11, 1),
(12, 1);
