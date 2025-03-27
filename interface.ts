export interface CampgroundItem {
  _id: string;
  number: number;
  name: string;
  address: string;
  telephone: string;
  appointments: string[];
  picture: string;
}

export interface CampgroundJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: CampgroundItem[];
}

export interface AppointmentItem {
  _id: string;
  apptDate: string;
  user: string;
  campground: Object;
  createdAt: Date;
}

export interface AppointmentJson {
  success: boolean;
  count: number;
  pagination: Object;
  data: AppointmentItem[];
}

// export interface Slip {
//   _id: string,
//   slip_image: Buffer;
//   submit_time: Date;
//   payment_id: string;
// }

// export interface PaymentJson {
//   success: boolean;
//   count: number;
//   pagination: Object;
//   data: PaymentItem[];
// }

export interface UserItem {
  _id: string;
  name: string;
  telephone: string;
  email: string;
  role: string;
  createdAt: Date;
}

// export interface OnePaymentJson{
//   success: boolean;
//   data: PaymentItem;
//   campgroundPrice: string;
// }