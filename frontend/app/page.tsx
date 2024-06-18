import { Company, CompanyCardProps } from '@/assets/types/dataType';
import CompanyCard from '../components/CompanyCard';
import data from '../data.json';

export default function HomePage() {
	return (
		<section className="px-4 py-6">
			<div className="container-xl lg:container m-auto">
				<h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">Recent Companies</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{data.companies.slice(0, 6).map((company:Company) => (
						<div key={company.id}>
							<CompanyCard
								id={company.id}
								companyName={company.companyName}
								linkedin={company.linkedin}
								comments={company.comments as string[]}
							/>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
