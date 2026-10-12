import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
test("catálogo, modal, solicitação e persistência", async ({ page }) => {
  await page.goto("/catalogo");
  await page.getByRole("button", { name: "Cupcakes", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Cupcake", exact: true }),
  ).toBeVisible();
  await page.getByLabel("Buscar por nome").fill("inexistente");
  await expect(
    page.getByText("Ainda não encontramos essa inspiração."),
  ).toBeVisible();
  await page.getByRole("button", { name: "Limpar filtros" }).click();
  const trigger = page.getByRole("button", {
    name: "Ver detalhes de Delicadeza floral",
  });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Adicionar à solicitação", exact: true })
    .click();
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  await page.getByRole("button", { name: "Sua solicitação, 1 itens" }).click();
  await page.getByLabel("Aumentar floral", { exact: true }).click();
  await page.keyboard.press("Escape");
  await page.reload();
  await page.getByRole("button", { name: "Sua solicitação, 2 itens" }).click();
  await page.getByLabel("Diminuir floral", { exact: true }).click();
  await page.getByLabel("Remover floral", { exact: true }).click();
  await expect(
    page.getByText("Sua solicitação está vazia.", { exact: false }),
  ).toBeVisible();
});
test("formulário, mensagem codificada e privacidade", async ({ page }) => {
  await page.goto("/encomenda");
  await page.getByRole("button", { name: "Preparar solicitação" }).click();
  await expect(page.getByText("Informe seu nome.")).toBeVisible();
  await page.getByLabel("Seu nome").fill("Ana & João");
  await page.getByLabel("Data desejada").fill("2027-12-20");
  await page.getByLabel("Quantidade aproximada").fill("25");
  await page
    .getByLabel("Preferências de decoração")
    .fill("Flores rosa & sálvia");
  await page.getByRole("button", { name: "Preparar solicitação" }).click();
  const href = await page
    .getByRole("link", { name: "Abrir WhatsApp com a solicitação" })
    .getAttribute("href");
  expect(new URL(href!).searchParams.get("text")).toContain("Nome: Ana & João");
  expect(new URL(href!).searchParams.get("text")).toContain("20/12/2027");
  expect(await page.evaluate(() => JSON.stringify(localStorage))).not.toContain(
    "Ana",
  );
});
test("responsividade, navegação e acessibilidade", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  for (const width of [390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `../../outputs/preview-${width}.png`,
      fullPage: true,
    });
  }
  for (const path of [
    "/",
    "/catalogo",
    "/encomenda",
    "/contato",
    "/galeria",
    "/sobre",
    "/privacidade",
  ]) {
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(
      result.violations,
      JSON.stringify(
        result.violations.map((v) => ({
          id: v.id,
          nodes: v.nodes.map((n) => n.target),
        })),
      ),
    ).toEqual([]);
  }
  expect(errors).toEqual([]);
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByLabel("Abrir menu").click();
  await page
    .getByRole("dialog")
    .getByRole("link", { name: "Galeria", exact: true })
    .click();
  await expect(page).toHaveURL(/galeria/);
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("galeria e movimento reduzido", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/galeria");
  await page
    .getByRole("button", { name: "Ver detalhes de Delicadeza floral" })
    .click();
  await page.getByLabel("Próxima imagem").click();
  await expect(
    page
      .getByRole("dialog")
      .getByRole("heading", { name: "Um pequeno jardim" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
});
test("3D real e controles", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Explorar bolo em 3D" }).click();
  await expect(page.locator("canvas")).toBeVisible({ timeout: 45000 });
  await page.getByLabel("Cobertura Rosa").click();
  await expect(page.getByLabel("Cobertura Rosa")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByLabel("Girar para a direita").click();
  await page.getByRole("button", { name: "Restaurar", exact: true }).click();
  await page
    .locator(".scene-card")
    .screenshot({ path: "../../outputs/preview-3d.png" });
});
test("fallback sem WebGL", async ({ page }) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type === "webgl2" || type === "webgl") return null;
      return (original as Function).apply(this, [type, ...args]);
    } as typeof original;
  });
  await page.goto("/");
  await page.getByRole("button", { name: "Explorar bolo em 3D" }).click();
  await expect(
    page.getByText("Seu navegador não disponibilizou o 3D.", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Encomendar pelo WhatsApp", exact: true }),
  ).toBeVisible();
});
