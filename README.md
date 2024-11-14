# cc-fullstuck-project

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
