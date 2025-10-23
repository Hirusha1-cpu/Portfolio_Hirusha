import { assets, workData } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "motion/react";

const Work = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Categorize projects for better organization
  const projectCategories = [
    { id: "all", name: "All Projects" },
    { id: "erp", name: "ERP Systems" },
    { id: "pos", name: "POS Systems" },
    { id: "fullstack", name: "Full Stack" },
    { id: "management", name: "Management Systems" },
  ];

  // Enhanced project data with categories and tech stacks
  const enhancedWorkData = workData.map((project, index) => {
    const baseProject = { ...project };

    // Add categories and tech stacks based on content
    if (
      project.title.toLowerCase().includes("erp") ||
      project.title.toLowerCase().includes("pos")
    ) {
      baseProject.categories = ["erp", "pos"];
      baseProject.techStack = ["React", "Node.js", "MySQL", "Express"];
    } else if (project.title.toLowerCase().includes("auth")) {
      baseProject.categories = ["fullstack"];
      baseProject.techStack = ["MERN Stack", "JWT", "Nodemailer"];
    } else if (project.title.toLowerCase().includes("management")) {
      baseProject.categories = ["management"];
      baseProject.techStack = ["MySQL", "React", "Node.js"];
    }

    return baseProject;
  });

  const filteredProjects =
    selectedCategory === "all"
      ? enhancedWorkData
      : enhancedWorkData.filter((project) =>
          project.categories?.includes(selectedCategory)
        );

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="work"
      className="w-full px-[5%] lg:px-[12%] py-16 scroll-mt-20 "
    >
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h4 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
          My Portfolio
        </h4>
        <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Featured Projects
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Explore my latest work in enterprise systems, full-stack applications,
          and business management solutions that drive efficiency and
          innovation.
        </p>
      </motion.div>

      {/* Category Filters */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-center gap-3 mb-12"
      >
        {projectCategories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-blue-600 text-white shadow-lg"
                : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Projects Grid */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
      >
        {filteredProjects.map((project, index) => (
          <motion.article
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className=" rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
          >
            {/* Project Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={
                  project.bgImage.startsWith("/")
                    ? project.bgImage
                    : `/${project.bgImage}`
                }
                alt={project.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-20 transition-all duration-300" />

              {/* Tech Stack Badges */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-2">
                {project.techStack?.slice(0, 2).map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="px-3 py-1 bg-white bg-opacity-90 text-xs font-medium rounded-full text-gray-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                {project.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                {project.description}
              </p>

              {/* Project Features */}
              <div className="flex items-center justify-between mt-6">
                <div className="flex items-center gap-3">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 group/btn"
                  >
                    View Project
                    <Image
                      src={
                        isDarkMode
                          ? assets.right_arrow_bold_dark
                          : assets.right_arrow_bold
                      }
                      alt="Right Arrow"
                      className="w-4 group-hover/btn:translate-x-1 transition-transform duration-300"
                    />
                  </a>
                </div>

                {/* Additional Tech Indicators */}
                {project.techStack && project.techStack.length > 2 && (
                  <div className="text-right">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      +{project.techStack.length - 2} more
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Show More Button */}
      {/* <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="text-center mt-16"
      >
        <button className="inline-flex items-center gap-3 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-full hover:bg-white dark:hover:bg-gray-800 hover:shadow-lg transition-all duration-300 font-medium group">
          View Complete Portfolio
          <Image
            src={
              isDarkMode
                ? assets.right_arrow_bold_dark
                : assets.right_arrow_bold
            }
            alt="Right Arrow"
            className="w-4 group-hover:translate-x-1 transition-transform duration-300"
          />
        </button>
      </motion.div> */}

      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-10 border-t border-gray-200 dark:border-gray-700"
      >
        {[
          { number: "10+", label: "Projects Completed" },
          { number: "5+", label: "ERP Systems" },
          { number: "3+", label: "Years Experience" },
          { number: "100%", label: "Client Satisfaction" },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
            className="text-center"
          >
            <div className="text-2xl lg:text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
              {stat.number}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
};

export default Work;
