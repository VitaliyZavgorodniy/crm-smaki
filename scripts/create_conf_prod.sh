echo "
export const API_URL    = '${API_URL:=https://api.smaki.com.ua}';
export const API_PREFIX = '${API_PREFIX:=api}';
export const NODE_ENV   = '${NODE_ENV:=PROD}';
" > ${CONFIG_PATH:='./src/config.js'}