import { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { dbClient } from '../../lib/awsClient';

const docClient = new DynamoDB.DocumentClient({ service: dbClient });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'PUT') {
    const { id, title, content } = req.body;

    if (!id || !title || !content) {
      return res.status(400).json({ message: 'ID, title, and content are required' });
    }

    try {
      await docClient.update({
        TableName: 'BlogPosts',
        Key: { id },
        UpdateExpression: 'set #title = :title, #content = :content',
        ExpressionAttributeNames: { '#title': 'title', '#content': 'content' },
        ExpressionAttributeValues: { ':title': title, ':content': content },
      });

      res.status(200).json({ message: 'Post updated' });
    } catch (error) {
      res.status(500).json({ message: 'Error updating post', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};