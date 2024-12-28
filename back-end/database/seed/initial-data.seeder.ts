import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';

import { Branch } from 'infrastructure/entities/branch.entity';
import { CoinAndBanknote } from 'infrastructure/entities/coin-and-banknote.entity';
import { Customer } from 'infrastructure/entities/customer.entity';
import { MachineCoinAndBanknote } from 'infrastructure/entities/machine-coin-and-banknote.entity';
import { Machine } from 'infrastructure/entities/machine.entity';
import { ProductMachine } from 'infrastructure/entities/product-machine.entity';
import { Product } from 'src/infrastructure/entities/product.entity';

export class CreateInitialData implements Seeder {
  public async run(dataSource: DataSource): Promise<void> {
    const product = dataSource.getRepository(Product);

    const products = [
      {
        id: 1,
        name: 'Coca Cola',
        images: JSON.stringify([
          'https://images.pexels.com/photos/2983100/pexels-photo-2983100.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/3200651/pexels-photo-3200651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ]),
        description: 'เครื่องดื่มอัดลมยอดนิยม ให้ความสดชื่น',
        price: 20.0,
        stockQuantity: 2,
      },
      {
        id: 2,
        name: 'Pepsi',
        images: JSON.stringify([
          'https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/11659356/pexels-photo-11659356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ]),
        description: 'เครื่องดื่มอัดลมที่รสชาติไม่เหมือนใคร',
        price: 18.0,
        stockQuantity: 4,
      },
      {
        id: 3,
        name: 'Lays Chips',
        images: JSON.stringify([
          'https://images.pexels.com/photos/4061441/pexels-photo-4061441.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ]),
        description: 'ขนมขบเคี้ยวกรอบอร่อยหลายรสชาติ',
        price: 35.0,
        stockQuantity: 6,
      },
      {
        id: 4,
        name: 'Oreo',
        images: JSON.stringify([
          'https://st.bigc-cs.com/cdn-cgi/image/format=webp,quality=90/public/media/catalog/product/28/89/8992760221028/8992760221028_1-20240923092253-.jpg',
        ]),
        description: 'บิสกิตคุกกี้แซนด์วิชที่เหมาะกับทุกวัย',
        price: 25.0,
        stockQuantity: 3,
      },
      {
        id: 5,
        name: 'Red Bull',
        images: JSON.stringify([
          'https://images.pexels.com/photos/793010/pexels-photo-793010.jpeg?auto=compress&cs=tinysrgb&w=800',
        ]),
        description: 'เครื่องดื่มชูกำลังสำหรับเพิ่มพลังงาน',
        price: 15.0,
        stockQuantity: 8,
      },
      {
        id: 6,
        name: 'Sprite',
        images: JSON.stringify([
          'https://www.dohome.co.th/media/catalog/product/cache/e446f15aaa8dc66b80b7a0df334f7c5a/1/0/10155668_bt_p1.jpg',
        ]),
        description: 'น้ำอัดลมกลิ่นมะนาว หวานซ่าเย็นใจ',
        price: 19.0,
        stockQuantity: 5,
      },
      {
        id: 7,
        name: 'KitKat',
        images: JSON.stringify([
          'https://images.pexels.com/photos/8444548/pexels-photo-8444548.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1668245/pexels-photo-1668245.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ]),
        description: 'ช็อกโกแลตแท่งกรอบที่เหมาะกับการพักเบรค',
        price: 22.0,
        stockQuantity: 5,
      },
      {
        id: 8,
        name: 'Water Bottle',
        images: JSON.stringify([
          'https://images.pexels.com/photos/1000084/pexels-photo-1000084.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ]),
        description: 'น้ำดื่มบริสุทธิ์ เหมาะสำหรับทุกโอกาส',
        price: 10.0,
        stockQuantity: 1,
      },
      {
        id: 9,
        name: 'Twix',
        images: JSON.stringify([
          'https://images.pexels.com/photos/15781931/pexels-photo-15781931/free-photo-of-a-cup-of-coffee-and-a-chocolate-bar.jpeg?auto=compress&cs=tinysrgb&w=800',
          'https://media.istockphoto.com/id/2180016710/photo/caramel-chocolate-bar.jpg?b=1&s=612x612&w=0&k=20&c=UamvLhKxAAVrrkeDoCkdm7e0Dg8YuEE3QEjGbybHTRw=',
          'https://images.pexels.com/photos/16065067/pexels-photo-16065067/free-photo-of-bowl-with-sweets.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ]),
        description: 'ช็อกโกแลตแท่งสองชิ้นที่มีความกรอบและหวานมัน',
        price: 23.0,
        stockQuantity: 3,
      },
      {
        id: 10,
        name: 'Mars Bar',
        images: JSON.stringify([
          'https://st.depositphotos.com/1024764/1717/i/450/depositphotos_17177023-stock-photo-mars-candy-chocolat-bar.jpg',
          'https://market.borong.com/product-images/677050979e20fc4a47559d51e4697691d28cd3d9.jpg',
          'https://assets.tops.co.th/MARS-MarsChocolate32g-0000093682923-1',
        ]),
        description: 'ช็อกโกแลตแท่งพร้อมนูกัตและคาราเมล รสชาติเข้มข้น',
        price: 24.0,
        stockQuantity: 2,
      },
      {
        id: 11,
        name: 'Pringles',
        images: JSON.stringify([
          'https://cdn.imweb.me/thumbnail/20240119/1bbf3fa09f9ce.jpg',
        ]),
        description: 'มันฝรั่งทอดกรอบในกระป๋อง หลากหลายรสชาติ',
        price: 45.0,
        stockQuantity: 5,
      },
      {
        id: 12,
        name: 'M&M',
        images: JSON.stringify([
          'https://down-th.img.susercontent.com/file/bf80124f2fddb4fc7ca5e141d91fb00c',
          'https://example.com/images/mms2.jpg',
          'https://www.newsnationnow.com/wp-content/uploads/sites/108/2023/01/MMsAP22021645371457.jpg?w=1280',
        ]),
        description: 'ช็อกโกแลตเคลือบสีสันสดใส อร่อยในทุกคำ',
        price: 30.0,
        stockQuantity: 7,
      },
    ];

    for (const productData of products) {
      console.log('Seeding product:', productData.name);
      await product.save(productData);
    }

    const branch = dataSource.getRepository(Branch);
    await branch.save({
      location: 'Bangkok',
      name: 'สาขา1',
      manager_name: 'Hello Name',
    });

    const machine = dataSource.getRepository(Machine);
    await machine.save({ branchId: 1, location: 'Bangkok', name: 'Machine 1' });

    const customer = dataSource.getRepository(Customer);
    await customer.save({
      id: 1,
      name: 'John Smith',
      phone_number: '095337294',
    });

    const productMachine = dataSource.getRepository(ProductMachine);
    const productMachineData = [
      { productId: 1, machineId: 1 },
      { productId: 2, machineId: 1 },
      { productId: 3, machineId: 1 },
      { productId: 4, machineId: 1 },
      { productId: 5, machineId: 1 },
      { productId: 6, machineId: 1 },
      { productId: 7, machineId: 1 },
      { productId: 8, machineId: 1 },
      { productId: 9, machineId: 1 },
      { productId: 10, machineId: 1 },
      { productId: 11, machineId: 1 },
      { productId: 12, machineId: 1 },
    ];

    for (const data of productMachineData) {
      await productMachine.save(data);
    }

    const coinList = [
      {
        denomination: 1,
        type: 'COIN',
      },
      {
        denomination: 5,
        type: 'COIN',
      },
      {
        denomination: 10,
        type: 'COIN',
      },
      {
        denomination: 20,
        type: 'BANKNOTE',
      },
      {
        denomination: 50,
        type: 'BANKNOTE',
      },
      {
        denomination: 100,
        type: 'BANKNOTE',
      },
      {
        denomination: 500,
        type: 'BANKNOTE',
      },
      {
        denomination: 1000,
        type: 'BANKNOTE',
      },
    ];

    const coinAndBanknote = dataSource.getRepository(CoinAndBanknote);
    for (const coinData of coinList) {
      await coinAndBanknote.save(coinData);
    }

    const all = await coinAndBanknote.find();
    const machineAndCoinData = [];
    for (const coinData of all) {
      machineAndCoinData.push({
        machineId: 1,
        coinAndBanknoteId: coinData.id,
        quantity: Math.floor(Math.random() * 20),
      });
    }

    const machineCoinAndBanknote = dataSource.getRepository(
      MachineCoinAndBanknote,
    );

    for (const data of machineAndCoinData) {
      await machineCoinAndBanknote.save(data);
    }
    console.log('Seeding initial data');

    console.log('Initial data has been seeded');
  }
}
