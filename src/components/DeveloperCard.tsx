import React from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface DeveloperCardProps {
  name: string;
  description: string;
  github: string;
  linkedin: string;
  portfolio: string;
  image: string;
  technologies: string[];
}

const DeveloperCard: React.FC<DeveloperCardProps> = ({
  name,
  description,
  github,
  linkedin,
  portfolio,
  image,
  technologies,
}) => {
  return (
    <Card className="bg-zinc-800 text-white transform transition-transform duration-300 hover:scale-105">
      <CardHeader className="flex flex-col items-center">
        <Image
          src={image}
          alt={name}
          width={100}
          height={100}
          className="rounded-full"
        />
        <CardTitle className="mt-4 text-2xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-zinc-400 text-center">
          {description}
        </CardDescription>
        <div className="flex justify-center space-x-4 mt-4">
          <a href={github} target="_blank" rel="noopener noreferrer" className="text-white">
            <FaGithub size={24} />
          </a>
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="text-white">
            <FaLinkedin size={24} />
          </a>
        </div>
        <div className="text-center text-blue-400 mt-4">
          <a href={portfolio} target="_blank" rel="noopener noreferrer">
            Visit Portfolio
          </a>
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-y-2 space-x-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="bg-zinc-700 px-2 py-1 rounded text-sm text-zinc-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </CardContent>
      <CardFooter className="text-center">
        {/* Add any additional footer content if necessary */}
      </CardFooter>
    </Card>
  );
};

export default DeveloperCard;