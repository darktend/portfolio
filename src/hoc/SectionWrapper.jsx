import { motion } from "framer-motion";
import { styles } from "../styles";
import { staggerContainer } from "../utils/motion";
import { useWindowSize } from "../hooks/useWindowSize.js";

const SectionWrapper = (Component, idName) => () => {
  const { isMobile } = useWindowSize();

  const hashSpanPadding = isMobile ? "20px" : "100px";

  return (
    <motion.section
      variants={staggerContainer()}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      className={`${styles.padding} max-w-7xl mx-auto relative z-0`}
    >
      <span
        className="hash-span"
        id={idName}
        style={{ paddingBottom: hashSpanPadding }}
      >
        &nbsp;
      </span>

      <Component />
    </motion.section>
  );
};

export default SectionWrapper;
