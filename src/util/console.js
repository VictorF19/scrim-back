const { NODE_ENV } = process.env

if (NODE_ENV == `production`) {

    console = {
        log(...params) {
           
        },
        error(...params) {
            
        }
    }
}