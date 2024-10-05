"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import colorCode from "../../../assets/colorCode.png";
import syncs from "../../../assets/syncs.jpg";
import privcyNotes from "../../../assets/privacy.png";
import mediaImage from "../../../assets/mediaImage.png";

type Feature = {
  index: number;
  title: string;
  description: string;
  image: string;
};

const features: Feature[] = [
  {
    index: 1,
    title: "Organize Effortlessly",
    description:
      "Easily tag, categorize, and color-code your notes for quick access. Organize them by categories, add tags for better filtering, and color-code for visual clarity.",
    image: colorCode.src,
  },
  {
    index: 2,
    title: "Sync Across All Devices",
    description:
      "Keep your notes in sync across your phone, tablet, and computer. Changes reflect instantly, ensuring you always have access, no matter the device.",
    image: syncs.src,
  },
  {
    index: 3,
    title: "Secure and Private",
    description:
      "Your notes are protected with end-to-end encryption. Only you can access your thoughts, ensuring privacy and security at all times.",
    image: privcyNotes.src,
  },
  {
    index: 4,
    title: "Add Media to Notes",
    description:
      "Attach images, checklists, and links to your notes. Capture ideas in different formats and keep everything in one place.",
    image: mediaImage.src,
  },
  {
    index: 7,
    title: "Search and Find Notes Instantly",
    description:
      "Find any note instantly with memoMind’s powerful search functionality. Search by keyword, tag, or category to locate notes in seconds.",
    image: mediaImage.src,
  },
  {
    index: 8,
    title: "Customizable Layouts",
    description:
      "Make memoMind yours by customizing layouts with different views and themes. Choose from list view, grid view, or a more visual style to suit your preference.",
    image: mediaImage.src,
  },
];

const FeatureSection = () => {
  return (
    <section className="mx-auto px-4 py-12 grids">
      <h1 className="text-center text-5xl font-extrabold mb-10 relative before:absolute before:content-[''] before:h-2 before:w-72 lg:before:w-[40rem] before:bg-yellow-500 before:bottom-[-1rem] before:mt-4">
        Why Choose MemoMind?
      </h1>
      <div className="lg:px-[10rem]">
        {features.map((item, idx) => (
          <motion.div
            key={idx}
            className={`flex flex-col-reverse md:flex-row items-center justify-between gap-8 my-10 py-5 shadow-md  ${
              idx % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            {/* Text Section */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
            >
              <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
              <p className="text-lg text-justify ">
                {item.description}
              </p>
            </motion.div>

            {/* Image Section */}
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: idx % 2 === 0 ? 50 : -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Image
                src={item.image}
                alt={`Feature ${idx + 1}`}
                width={500}
                height={500}
                className="rounded-lg shadow-lg object-cover"
                // objectFit="cover"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
