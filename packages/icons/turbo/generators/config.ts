import * as fs from "fs";
import * as path from "path";
import { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("icons", {
    description: "Convert SVG files to React components",
    prompts: [
      {
        type: "confirm",
        name: "generateIcons",
        message: "Confirm icons generation?",
        default: true,
      },
    ],
    actions: () => {
      const inputFolder = "./packages/icons/svg";
      const outputFolder = "./packages/icons/components";
      const indexFile = "./packages/icons/index.tsx";

      const svgFiles = fs
        .readdirSync(inputFolder)
        .filter((file) => file.endsWith(".svg"));

      const filesToRemove = fs.readdirSync(outputFolder);
      filesToRemove.forEach((file) => {
        fs.unlinkSync(path.join(outputFolder, file));
      });

      if (fs.existsSync(indexFile)) fs.unlinkSync(indexFile);

      const actions = svgFiles.map((svgFile, index) => {
        return [
          {
            type: "add",
            path: "components/{{ pascalCase name }}.tsx",
            template: fs.readFileSync(
              path.join(__dirname, "templates/component.hbs"),
              "utf-8"
            ),
            data: {
              name: `{{ ${svgFile.replace(".svg", "")} }}-icon`,
              svgContent: fs.readFileSync(
                path.join(inputFolder, svgFile),
                "utf-8"
              ),
            },
          },
          {
            type: index == 0 ? "add" : "append",
            path: "index.tsx",
            template: fs.readFileSync(
              path.join(__dirname, "templates/exports.hbs"),
              "utf-8"
            ),
            data: {
              name: `{{ ${svgFile.replace(".svg", "")}-icon }}`,
            },
          },
        ];
      });

      return actions.flat();
    },
  });
}
