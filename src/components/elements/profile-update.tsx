import { USER_PROFILE_IMAGE_UPADATE, USER_PROFILE_IMAGE_UPADATE_METHOD } from "@/constants/urls";
import { queryClient } from '@/lib/client';
import { getAuthAccessToken, getImageURL, getURL } from "@/lib/fetch";
import { useMutation } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function ProfileUpdate({ imageUrl, name }: { imageUrl?: string, name?: string }) {

  const [image, setImage] = useState<string>("");

  useEffect(() => {
    if (imageUrl) {
      setImage(getImageURL(imageUrl));
    }
  }, [imageUrl])

  const { mutate, isPending } = useMutation({
    mutationKey: ['profile-image'],
    mutationFn: async (formdata: FormData) => {

      try {
        const response = await fetch(getURL(USER_PROFILE_IMAGE_UPADATE), {
          method: USER_PROFILE_IMAGE_UPADATE_METHOD,
          body: formdata,
          headers: {
            Authorization: `Bearer ${await getAuthAccessToken()}`,
            // 'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          queryClient.invalidateQueries({ queryKey: ['user'] });
        }

      } catch (error) {
        console.error('Error:', error);
        // imageUrl && setImage(getImageURL(imageUrl));
        // setImage(getImageURL(imageUrl ?? ''));
      }
    }
  })

  const handleOnUpdateImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImage(URL.createObjectURL(file as Blob));
    const formData = new FormData();
    formData.append('profile_image', file as Blob);
    mutate(formData);
  }


  return (
    <label htmlFor="" className="relative aspect-[92/86] flex flex-col group w-[92px] md:w-[50px]">
      <div className='aspect-[92/86] flex-1 bg-[#D9D9D9] rounded-xl overflow-hidden relative'>
        {
          image ?
            <Image
              src={image}
              alt={name ?? 'profile'}
              fill
              // sizes='84px'
              className="object-cover object-top"
            />
            :
            <div>

            </div>
        }
      </div>
      <div className="absolute inset-0 hidden group-hover:flex items-center justify-center bg-[#00000040] rounded-xl">
        <Edit/>
      </div>
      {isPending ? <div className='absolute top-0 left-0 w-full h-full bg-[#00000040] flex items-center justify-center'/>: <></>}
      <input type="file" onChange={handleOnUpdateImage} accept="image/*" className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer' />
    </label>
  )
}
