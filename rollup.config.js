import { swc } from 'rollup-plugin-swc3';
import { globSync } from "glob";

const inputs = globSync("**/*.ts", { ignore: "./node_modules/**" })

export default inputs.map((input) => ({
    input,
    output: {
        dir: 'dist',
        format: 'cjs'
    },
    plugins: [swc({jsc:{}, minify: true})]
}));
