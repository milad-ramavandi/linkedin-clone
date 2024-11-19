"use client";
import { handleFollowOrUnfollowAction } from "@/actions/contact";
import { IContact } from "@/types/contact";
import { useUser } from "@clerk/nextjs";
import { Avatar, Button } from "@nextui-org/react";
import React, { MouseEventHandler, useEffect, useState } from "react";
import CheckIcon from "../check-icon";
import PlusIcon from "../plus-icon";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const Contact = ({ contact }: { contact: IContact }) => {
  const router = useRouter();
  const [followed, setFollowed] = useState<boolean>(false);
  const [followers] = useState<string[]>(
    contact.followers === undefined ? [] : contact.followers
  );
  const user = useUser();
  useEffect(() => {
    if (followers.includes(user.user?.id as string)) {
      setFollowed(true);
    }
  }, [user]);

  const handleFollowOrUnfollowClick: MouseEventHandler = async () => {
    toast.promise(handleFollowOrUnfollowAction(contact, followed), {
        pending:`${followed? 'Unfollowing': 'Following'} is pending`,
        success:`${followed?'Unfollowing': 'Following'} is successfully`,
        error:`Failed to ${followed? 'Unfollowing': 'Following'}`
    })
    
    setFollowed((prev) => !prev);
    router.refresh()
  };
  return (
    <div className="flex space-x-2">
      <Avatar src={contact.src} showFallback />
      <div className={"space-y-1"}>
        <p className="text-sm font-semibold">{contact.name}</p>
        <p className="text-xs text-gray-400">{contact.title}</p>
        <Button
          type="button"
          radius={"full"}
          size={"sm"}
          variant={"ghost"}
          onClick={handleFollowOrUnfollowClick}
          startContent={followed ? <CheckIcon /> : <PlusIcon />}
        >
          {followed ? "Following" : "Follow"}
        </Button>
      </div>
    </div>
  );
};

export default Contact;
