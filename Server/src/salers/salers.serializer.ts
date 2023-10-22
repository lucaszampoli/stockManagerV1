//
// Created by Lucas V A Zampoli o 21/10/23.
// Copyright 2023 &copy; Zampo: All rights reserved.
//

import { Order } from '@prisma/client';
import { User } from '@prisma/client';


export class SalerSerializer {
  id: number;
  user_id: number;
  payment_method: string;
  total: number;
  date_added: Date;
  date_modified: Date;
  name: string;
  email: string;
  profile: string;
  status: string;
  password: string;

  constructor(order: Order, user:User) {
    this.id = order.id;
    this.user_id = order.user_id;
    this.payment_method = order.payment_method;
    this.total = Number(order.total);
    this.date_added = order.date_added;
    this.date_modified = order.date_modified;
    this.name = user.name;
    this.email = user.email;
    this.profile = user.profile;
    this.status = user.status;
    this.password = user.password;

    
  }
}
