const log = ({ ...rest }) => {
  if (process.env.DEBUG) {
    console.log(rest);
  }
};

export default log;
