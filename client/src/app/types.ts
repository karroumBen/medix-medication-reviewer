export interface User {
  _id: string;
  fullname: string;
  email: string;
  password: string;
}

export interface Image {
  filename: string;
  originalname: string;
  _id: string,
}

export interface Review {
  _id: string,
  review: string;
  rating: number;
  by: { user_id: string; fullname: string };
  date: number;
}

export interface Owner {
  user_id: string;
  fullname: string;
  email: string;
}

export interface Medication {
  _id: string,
  name: string;
  first_letter: string;
  generic_name: string;
  medication_class: string;
  availability: string;
  image: Image;
  added_by: Owner;
  reviews: Review[];
}
