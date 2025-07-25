import ProfileUpdate from "@/components/elements/profile-update";
// import IdeaList from "../community/idea-list";

interface Props {
  name: string;
  email: string;
  role: string;
  bio: string;
  imageUrl?: string;
  id?: number;
}

export default function UserDetails({ name, email, bio, imageUrl }: Props) {
  return (
    <div>
      <div className="flex lg:flex-col gap-x-3 items-center lg:items-start gap-y-1">
        <ProfileUpdate imageUrl={imageUrl} name={name} />
        <div className="max-w-[300px]">
          <p className="text-lg font-medium ">{name}</p>
          <p className="text-sm font-light text-foreground/50">{email}</p>
          <p className="text-sm font-light mt-2 line-clamp-4">{bio}</p>
        </div>
      </div>
    </div>
  );
}
