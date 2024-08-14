
const errorMiddleware = (err, req, res, next) => {
    console.error(err.stack); 
  
    const statusCode = err.statusCode || 500; 
    const response = {
      status: 'error',
      message: err.message || 'Internal Server Error',
      ...(process.env.NODE_ENV === 'development' && { 
        stack: err.stack,
      }),
    };
    res.status(statusCode).json(response);
  };
  
  export default errorMiddleware;
  