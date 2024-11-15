# cc-fullstuck-project

# Client

割り勘アプリ

# Server

## API エンドポイント一覧

### POST `/project`

プロジェクトを作成し、メンバーを追加する

- リクエストボディ: `{projectName: プロジェクトの名前, members: メンバー名の配列}`
- レスポンスボディ: `{projectId: プロジェクトのID}`

### GET `/project/:projectId`

指定した `projectId` のプロジェクト情報を取得する

- リクエストボディ: なし
- レスポンスボディ: `{projectId: プロジェクトのID, projectName: プロジェクトの名前}`

### GET `/project/:projectId/members`

指定した `projectId` のプロジェクトに属するメンバーの情報を取得する

- リクエストボディ：なし
- レスポンスボディ： `{memberId: メンバーのID, members: メンバー名の配列}`

### POST `/payment`

立替記録を追加する

- リクエストボディ: `{payerId: 支払った人のID, payeeIds: 支払われた人のIDの配列, amount: 金額, description: 支払いの説明}`
- レスポンスボディ: `{paymentId: 立替記録のID}`

### GET `/project/:projectId/payments`

指定した `projectId` のプロジェクトに属する立替記録の情報を取得する

- リクエストボディ: なし
- レスポンスボディ: `{payments: 立替記録の配列}`
  - 立替記録: `{paymentId: 立替記録のID, payerId: 支払った人のID, payeeIds: 支払われた人のIDの配列, amount: 金額, description: 支払いの説明, timestamp: タイムスタンプ}`

### GET `/payment/:paymentId`

指定した `paymentId` の立替記録の情報を取得する

- リクエストボディ: なし
- レスポンスボディ: `{paymentId: 立替記録のID, payerId: 支払った人のID, payeeIds: 支払われた人のIDの配列, amount: 金額, description: 支払いの説明, timestamp: タイムスタンプ}`

### PATCH `/members/:memberId`

指定した `memberId` の一部情報を書き換える

- リクエストボディ: `{tiltWeight: 傾斜の重み}`
- レスポンスボディ: なし
