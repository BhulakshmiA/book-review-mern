// Handles 404 errors (requests to routes that don't exist)
const notFound = (req, res, next) => {
    const error = new Error(`Not Found - ${req.originalUrl}`);
    res.status(404);
    next(error); // Pass the error to the next error handler
};

// Generic error handler
const errorHandler = (err, req, res, next) => {
    // Sometimes Express sets the status code to 200 even on an error. We fix that here.
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        // Only show stack trace in development mode
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};

export { notFound, errorHandler };