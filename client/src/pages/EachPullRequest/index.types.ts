export interface PullRequest {
  active_lock_reason: string | null;
  assignee: string | null;
  assignees: string[];
  author_association: string;
  auto_merge: boolean | null;
  base: {
    label: string;
    ref: string;
    sha: string;
    user: {
      [key: string]: any; 
    };
    repo: {
      [key: string]: any; 
    };
  };
  body: string | null;
  closed_at: string | null;
  comments_url: string;
  commits_url: string;
  created_at: string;
  diff_url: string;
  draft: boolean;
  head: {
    label: string;
    ref: string;
    sha: string;
    user: {
      [key: string]: any; 
    };
    repo: {
      [key: string]: any; 
    };
  };
  html_url: string;
  id: number;
  issue_url: string;
  labels: any[]; 
  locked: boolean;
  merge_commit_sha: string;
  merged_at: string | null;
  milestone: string | null;
  node_id: string;
  number: number;
  patch_url: string;
  requested_reviewers: any[]; // Replace with reviewer type if known
  requested_teams: any[]; // Replace with team type if known
  review_comment_url: string;
  review_comments_url: string;
  state: string;
  statuses_url: string;
  title: string;
  updated_at: string;
  url: string;
  user: {
    avatar_url: string;
    events_url: string;
    followers_url: string;
    following_url: string;
    gists_url: string;
    gravatar_id: string;
    html_url: string;
    id: number;
    login: string;
    node_id: string;
    organizations_url: string;
    received_events_url: string;
    repos_url: string;
    site_admin: boolean;
    starred_url: string;
    subscriptions_url: string;
    type: string;
    url: string;
    user_view_type: string;
  };
  _links: {
    comments: { href: string };
    commits: { href: string };
    html: { href: string };
    issue: { href: string };
    review_comment: { href: string };
    review_comments: { href: string };
    self: { href: string };
  };
}
