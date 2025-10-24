import { assets, workData } from "@/assets/assets";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "motion/react";

const Work = ({ isDarkMode }) => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  // Function to open modal with project details
  const openProjectModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  // Function to close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

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
            className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group cursor-pointer"
          >
            {/* Project Image - Clickable */}
            <div 
              className="relative h-48 overflow-hidden cursor-pointer"
              onClick={() => openProjectModal(project)}
            >
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

              {/* Click to view overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="bg-white bg-opacity-90 text-gray-800 px-4 py-2 rounded-lg font-medium flex items-center gap-2">
                  <span>View Details</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
              </div>

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

      {/* Project Details Modal */}
      {isModalOpen && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={closeModal}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="bg-white dark:bg-gray-800 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="relative h-64">
              <Image
                src={
                  selectedProject.bgImage.startsWith("/")
                    ? selectedProject.bgImage
                    : `/${selectedProject.bgImage}`
                }
                alt={selectedProject.title}
                fill
                className="object-cover"
              />
              <button
                onClick={closeModal}
                className="absolute top-4 right-4 bg-white dark:bg-gray-800 rounded-full p-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-4">
                {selectedProject.title}
              </h2>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                  Project Description
                </h3>
                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                  {selectedProject.description}
                </p>
              </div>

              {/* Tech Stack */}
              {selectedProject.techStack && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                    Technologies Used
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.techStack.map((tech, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm font-medium rounded-full"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Project Link */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-gray-700">
                <a
                  href={selectedProject.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
                >
                  View Live Project
                  <Image
                    src={
                      isDarkMode
                        ? assets.right_arrow_bold_dark
                        : assets.right_arrow_bold
                    }
                    alt="Right Arrow"
                    className="w-4"
                  />
                </a>
                
                <button
                  onClick={closeModal}
                  className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-300 font-medium"
                >
                  Close
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}

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