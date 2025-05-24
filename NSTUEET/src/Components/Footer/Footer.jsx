import classNames from "classnames";
import styles from "./Footer.module.css";

function Footer() {
  const date = new Date();
  var currentYear = date.getFullYear();

  return (
    <>
      <div className={classNames(styles.footerContainer)}>
        <p className={classNames(styles.copyRight)}>
          <a className={classNames(styles.footerAncor)} href="#">
            NSTUEET
          </a>{" "}
          | All Rights Reserved | Copyright © {currentYear}
        </p>
        <p className={classNames(styles.developers)}>
          Developed By |{" "}
          <a className={classNames(styles.footerAncor)} href="#">
            Aminul Imam
          </a>{" "}
          |{" "}
          <a className={classNames(styles.footerAncor)} href="#">
            Rabiul Hasan
          </a>
        </p>
      </div>
    </>
  );
}

export default Footer;
