import { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { dbClient } from '../../lib/awsClient';

const docClient = new DynamoDB.DocumentClient({ service: dbClient });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { Items } = await docClient.scan({ TableName: 'BlogPosts' });
    res.status(200).json({ posts: Items });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts', error });
  }
};