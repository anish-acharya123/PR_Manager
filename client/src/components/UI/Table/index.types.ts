// Row type matching the data fetched from your database
interface Reviewers {
  reviewerName: string;
  reviewerGithub: string;
  email: string;
}

export interface PullRequest {
  _id: string;
  prId: string;
  title: string;
  prLink: string;
  authorName: string;
  authorLink: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  repoName: string;
  reviewers: Reviewers; // Could be enhanced with reviewer details
}

// Column definition type
export interface Column<T> {
  header: string; // Column name
  accessor: keyof T; // Key from row object
  render?: (value: any, row: T) => React.ReactNode; // Custom render function
}
