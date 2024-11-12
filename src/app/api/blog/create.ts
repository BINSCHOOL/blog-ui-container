/* eslint-disable import/no-anonymous-default-export */
import { NextApiRequest, NextApiResponse } from 'next';
import { DynamoDB } from '@aws-sdk/client-dynamodb';
import { dbClient } from '../../lib/awsClient';

const docClient = new DynamoDB.DocumentClient({ service: dbClient });

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Title and content are required' });
    }

    const id = new Date().toISOString();  // Unique ID based on timestamp

    try {
      await docClient.put({
        TableName: 'BlogPosts',  // Your DynamoDB Table
        Item: { id, title, content, createdAt: new Date().toISOString() },
      });

      res.status(201).json({ message: 'Post created', id });
    } catch (error) {
      res.status(500).json({ message: 'Error creating post', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
};