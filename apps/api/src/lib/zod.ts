import { ZodErrorMap, z } from 'zod';

/**
 * zodエラーメッセージ（日本語）
 */
const customErrorMap: ZodErrorMap = (issue, ctx) => {
  // zodエラーコードごとにメッセージをカスタマイズする
  switch (issue.code) {
    // 型に誤り
    case z.ZodIssueCode.invalid_type:
      // undefinedだった場合は未入力判定
      if (issue.received === z.ZodParsedType.undefined) {
        return { message: '必須項目です' };
      }
      return { message: '値に誤りがあります' };

    case z.ZodIssueCode.too_big:
      return { message: `${issue.maximum}文字以内で入力してください` };

    case z.ZodIssueCode.too_small:
      if (issue.type === 'array') {
        return { message: `${issue.minimum}つ以上チェックしてください` };
      }
      return { message: `${issue.minimum}文字以上で入力してください` };
  }

  // デフォルトのメッセージを返す
  return { message: ctx.defaultError };
};

z.setErrorMap(customErrorMap);

export { z };
