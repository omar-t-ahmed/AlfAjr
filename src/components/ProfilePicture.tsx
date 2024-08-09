import React from "react";
import Image, { StaticImageData } from "next/image";
import placeholder from '../../public/placeholder.jpg'
import pfp1 from "../../public/female-pfp-1.jpg";
import pfp2 from "../../public/female-pfp-2.jpg";
import pfp3 from "../../public/female-pfp-3.jpg";
import pfp4 from "../../public/male-pfp-1.jpg";
import pfp5 from "../../public/male-pfp-2.jpg";
import pfp6 from "../../public/male-pfp-3.jpg";

const profilePictures: StaticImageData[] = [placeholder, pfp1, pfp2, pfp3, pfp4, pfp5, pfp6];

interface ProfilePictureProps {
    profilePictureNumber: number;
}

const ProfilePicture: React.FC<ProfilePictureProps> = ({ profilePictureNumber }) => {
    const selectedPicture = profilePictures[profilePictureNumber] || placeholder;
    return (
        <div className="flex flex-col items-center">
            <div className="mb-1">
                <Image
                    src={selectedPicture}
                    alt="Profile Picture"
                    className="rounded-full"
                    width={40}
                    height={40}
                />
            </div>
        </div>
    );
};

export default ProfilePicture;