import type { SourceFile } from "ts-morph";

import path from "node:path";

import { IndentationText, Project, VariableDeclarationKind } from "ts-morph";

interface Options {
  routesDir: string;
  fileList: string[];
  fileMetaList: string[];
  onCalculateRoutePath: (filepath: string) => string;
  onCalculateImportPath: (filepath: string) => string;
}

export async function getFileBasedRoutes(options: Options): Promise<string> {
  const sourceFile = new Project({
    manipulationSettings: {
      indentationText: IndentationText.TwoSpaces,
    },
  }).createSourceFile("virtual.ts", "", { overwrite: true });

  sourceFile.addImportDeclaration({
    moduleSpecifier: "react",
    namedImports: ["lazy"],
  });

  sourceFile.addImportDeclaration({
    moduleSpecifier: "react-router",
    isTypeOnly: true,
    namedImports: ["NonIndexRouteObject"],
  });

  addRoutePathAllType(sourceFile, options);
  addRouteSearchParamsAllType(sourceFile, options);
  addRoutesConstant(sourceFile, options);

  return sourceFile.getFullText();
}

function addRoutePathAllType(sourceFile: SourceFile, options: Options) {
  const { fileList, onCalculateRoutePath } = options;
  const routePathAllList = fileList.map((filepath) => onCalculateRoutePath(filepath));

  sourceFile
    .addTypeAlias({
      name: "RoutePathAll",
      isExported: true,
      type: (writer) => {
        routePathAllList.forEach((routePath) => {
          writer.newLine();
          writer.write("| ");
          writer.quote(routePath);
        });
      },
    })
    .addJsDoc("路由路径");
}

function addRouteSearchParamsAllType(sourceFile: SourceFile, options: Options) {
  const { fileMetaList, routesDir, onCalculateRoutePath } = options;
  const routeMetaProject = new Project({ skipAddingFilesFromTsConfig: true });
  const routeMetaConfigList = fileMetaList.map((metaFilepath) => {
    const metaSourceFile = routeMetaProject.addSourceFileAtPath(path.resolve(routesDir, metaFilepath));

    const interfaceMembers = metaSourceFile
      .getInterface("RouteSearchParams")!
      .getMembers()
      .map((member) => member.getText(true))
      .join("\n");

    return {
      routePath: onCalculateRoutePath(metaFilepath),
      typeText: `{\n${interfaceMembers}\n}`,
    };
  });

  sourceFile
    .addTypeAlias({
      name: "RouteSearchParamsAll",
      isExported: true,
      type: (writer) => {
        if (!routeMetaConfigList.length) {
          writer.write("Record<string, never>");
          return;
        }

        writer.write("{");
        routeMetaConfigList.forEach(({ routePath, typeText }) => {
          writer.newLine();
          writer.quote(routePath);
          writer.write(": ");
          writer.write(typeText);
          writer.write(";");
        });
        writer.newLine();
        writer.write("}");
      },
    })
    .addJsDoc("路由参数定义");
}

function addRoutesConstant(sourceFile: SourceFile, options: Options) {
  const { fileList, onCalculateRoutePath, onCalculateImportPath } = options;
  const routeConfigList = fileList.map((filepath) => {
    return {
      routePath: onCalculateRoutePath(filepath),
      importPath: onCalculateImportPath(filepath),
    };
  });

  sourceFile
    .addVariableStatement({
      declarationKind: VariableDeclarationKind.Const,
      isExported: true,
      declarations: [
        {
          name: "ROUTES",
          initializer: (writer) => {
            writer.write("[");
            routeConfigList.forEach(({ routePath, importPath }) => {
              writer.newLine();
              writer.write("{");
              writer.newLine();
              writer.write("path: ");
              writer.quote(routePath);
              writer.write(",");
              writer.newLine();
              writer.write("Component: lazy(() => import(");
              writer.quote(importPath);
              writer.write("))");
              writer.newLine();
              writer.write("}");
              writer.write(",");
            });
            writer.newLine();
            writer.write('] as const satisfies Array<Pick<NonIndexRouteObject, "path" | "Component">>');
          },
        },
      ],
    })
    .addJsDoc("路由表");
}
