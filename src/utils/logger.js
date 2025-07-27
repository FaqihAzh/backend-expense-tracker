class Logger {
  static info(message, data = null) {
    console.log(`[INFO] ${new Date().toISOString()}: ${message}`, data || '');
  }

  static error(message, error = null) {
    console.error(`[ERROR] ${new Date().toISOString()}: ${message}`, error || '');
  }

  static warn(message, data = null) {
    console.warn(`[WARN] ${new Date().toISOString()}: ${message}`, data || '');
  }
}

export default Logger;