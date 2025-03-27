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
