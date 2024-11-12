import { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { dbClient } from '../../lib/awsClient';

const docClient = new DynamoDB.DocumentClient({ service: dbClient });

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'ID is required' });
    }

    try {
      await docClient.delete({
        TableName: 'BlogPosts',
        Key: { id },
      });

      res.status(200).json({ message: 'Post deleted' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting post', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};