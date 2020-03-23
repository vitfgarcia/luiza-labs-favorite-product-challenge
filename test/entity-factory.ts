/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Factory from 'factory.ts';
import { v4 as uuid } from 'uuid';
import * as faker from 'faker';

import { User, Customer, Product } from '../src/entity';

export const userFactory = Factory.Sync.makeFactory<Partial<User>>({
    id: Factory.each(uuid),
    username: Factory.each((_) => faker.internet.userName()),
    password: Factory.each((_) => faker.internet.password()),
});

export const customerFactory = Factory.Sync.makeFactory<Partial<Customer>>({
    id: Factory.each(uuid),
    name: Factory.each((_) => faker.name.firstName()),
    email: Factory.each((_) => faker.internet.email()),
});

export const productFactory = Factory.Sync.makeFactory<Partial<Product>>({
    id: Factory.each(uuid),
    price: Factory.each((_) => Number(faker.commerce.price())),
    image: Factory.each((_) => faker.image.imageUrl()),
    brand: Factory.each((_) => faker.lorem.word()),
    title: Factory.each((_) => faker.lorem.sentence()),
    reviewScore: Factory.each((_) => faker.random.number()),
});
