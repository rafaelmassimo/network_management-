export interface Company {
	id: number;
	companyName: string;
	linkedin: string[];
	comments: string | string[];
}
export interface CompanyCardProps {
	id: number;
	companyName: string;
	linkedin: string[];
	comments: string[];
}

export interface CommentsProps {
	comments: string[];
}

export interface LinkedinProps {
	linkedin: string[];
}
