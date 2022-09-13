import * as http from "http";

import {ServerOptions} from "./lib/options";
import * as child_process from "child_process";
import * as fs from "fs";


export default class server extends http.Server {
    private readonly options: ServerOptions

    constructor(options: ServerOptions) {
        super()

        this.options = options
    }

    public getPort() {
        return this.options.port
    }

    public start(callback: Function): void {
        this.listen(this.options.port, () => {
            callback()

            if (this.options.developmentMode) {
                switch (process.platform) {
                    case "win32":
                        child_process.execSync(`start http://localhost:${this.options.port}`)
                        break
                    case "darwin":
                        child_process.execSync(`open http://localhost:${this.options.port}`)
                        break
                    case "linux":
                        child_process.execSync(`xdg-open http://localhost:${this.options.port}`)
                        break

                    default:
                        console.log(`You are using unsupported platform(${process.platform || "unknown"})`)
                }
            }

        })
    }

    public mapping(path: string, callback: Function) {
        this.on("request", (req, res) => {
            if (req.url === path) {
                callback(req, res)
            }
        })
    }

    public useMapper(path: string, mapper: any) {
        this.on("request", (req, res) => {
            if (req.url === path) {
                new mapper().whenRequested(req, res)
            }
        })
    }

    public useRoot(rootDir: string) {
        this.on("request", (req, res) => {
            const url = req.url

            try {
                let content: string

                if (url === "/") content = fs.readFileSync(rootDir + "/index.html", "utf-8")

                else content = fs.readFileSync(rootDir + url, "utf-8")


                res.end(content)
            }catch (ex) {
                res.end(`${url}: No such file in root directory`)
            }
        })
    }

}
