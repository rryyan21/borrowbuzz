-- Enable Row Level Security
alter database postgres set "app.jwt_secret" to 'super-secret-jwt-token-with-at-least-32-characters-long';

-- Create listings table
create table public.listings (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  title text not null,
  description text,
  price_per_day decimal(10,2) not null,
  category text not null,
  condition text not null check (condition in ('new', 'like_new', 'good', 'fair', 'poor')),
  availability_status text not null default 'available' check (availability_status in ('available', 'rented', 'unavailable')),
  location text,
  images text[],
  contact_info jsonb,
  view_count integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create categories table
create table public.categories (
  id uuid default gen_random_uuid() primary key,
  name text not null unique,
  emoji text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Insert default categories
insert into public.categories (name, emoji) values
  ('Electronics', '📱'),
  ('Books & Study', '📚'),
  ('Clothing & Accessories', '👕'),
  ('Sports & Recreation', '⚽'),
  ('Home & Living', '🏠'),
  ('Transportation', '🚲'),
  ('Tools & Equipment', '🔧'),
  ('Kitchen & Dining', '🍽️'),
  ('Other', '📦');

-- Create rentals/transactions table
create table public.rentals (
  id uuid default gen_random_uuid() primary key,
  listing_id uuid references public.listings(id) on delete cascade not null,
  renter_id uuid references auth.users(id) on delete cascade not null,
  owner_id uuid references auth.users(id) on delete cascade not null,
  start_date date not null,
  end_date date not null,
  total_price decimal(10,2) not null,
  status text not null default 'pending' check (status in ('pending', 'active', 'completed', 'cancelled')),
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Create user profiles table
create table public.profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  full_name text,
  university text default 'University of Michigan',
  graduation_year integer,
  phone_number text,
  bio text,
  avatar_url text,
  campus_location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Set up Row Level Security (RLS)
alter table public.listings enable row level security;
alter table public.categories enable row level security;
alter table public.rentals enable row level security;
alter table public.profiles enable row level security;

-- Listings policies
create policy "Public listings are viewable by everyone" on public.listings
  for select using (true);

create policy "Users can insert their own listings" on public.listings
  for insert with check (auth.uid() = user_id);

create policy "Users can update their own listings" on public.listings
  for update using (auth.uid() = user_id);

create policy "Users can delete their own listings" on public.listings
  for delete using (auth.uid() = user_id);

-- Categories policies (public read)
create policy "Categories are viewable by everyone" on public.categories
  for select using (true);

-- Rentals policies
create policy "Users can view rentals they're involved in" on public.rentals
  for select using (auth.uid() = renter_id or auth.uid() = owner_id);

create policy "Users can create rentals" on public.rentals
  for insert with check (auth.uid() = renter_id);

create policy "Users can update rentals they're involved in" on public.rentals
  for update using (auth.uid() = renter_id or auth.uid() = owner_id);

-- Profiles policies
create policy "Public profiles are viewable by everyone" on public.profiles
  for select using (true);

create policy "Users can insert their own profile" on public.profiles
  for insert with check (auth.uid() = id);

create policy "Users can update their own profile" on public.profiles
  for update using (auth.uid() = id);

-- Create functions for updating timestamps
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = timezone('utc'::text, now());
  return new;
end;
$$ language plpgsql;

-- Create function for incrementing view count
create or replace function public.increment_view_count(listing_id uuid)
returns void as $$
begin
  update public.listings 
  set view_count = view_count + 1 
  where id = listing_id;
end;
$$ language plpgsql security definer;

-- Create triggers for updated_at
create trigger handle_updated_at before update on public.listings
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.rentals
  for each row execute procedure public.handle_updated_at();

create trigger handle_updated_at before update on public.profiles
  for each row execute procedure public.handle_updated_at();

-- Create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer set search_path = public;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user(); 