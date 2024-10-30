import { ChartData } from "@/components/BidAnalyticChart";
import { env } from "@/env";

interface BidDataset {
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
}

interface BidChartData {
  responsive: boolean;
  labels: string[];
  datasets: BidDataset[];
}

interface BidOutputData {
  title: string;
  chartData: BidChartData;
}

interface VacancyDataset {
  type: string;
  label: string;
  data: number[];
  borderColor: string;
  backgroundColor: string;
  yAxisID: string;
}

interface VacancyOutputData {
  data: VacancyDataset[];
}

async function getInstructors(moduleCode: string) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/instructordata/instructor/${encodeURIComponent(moduleCode)}`,
  );
  const data = (await res.json()) as { data: string[] };
  return data.data;
}

async function getTermsAvailable(moduleCode: string, instructor: string) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/instructordata/terms_available/${encodeURIComponent(moduleCode)}/${encodeURIComponent(instructor)}`,
  );
  const data = (await res.json()) as { data: string[] };
  return data.data;
}

async function getSections(
  moduleCode: string,
  instructor: string,
  term: string,
) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/instructordata/sections_available/${encodeURIComponent(moduleCode)}/${encodeURIComponent(instructor)}/${encodeURIComponent(term)}`,
  );
  const data = (await res.json()) as { data: string[] };
  return data.data;
}

function mergeDatasets(
  dataset1: BidOutputData,
  dataset2: VacancyOutputData,
): ChartData[] {
  const { labels, datasets: bidsDatasets } = dataset1.chartData;
  const vacanciesDatasets = dataset2.data;

  // Extract data from bids datasets
  const medianBidData =
    bidsDatasets.find((ds) => ds.label === "Median Bid")?.data || [];
  const minBidData =
    bidsDatasets.find((ds) => ds.label === "Min Bid")?.data || [];

  // Extract data from vacancies datasets
  const befVacData =
    vacanciesDatasets.find((ds) => ds.label === "Before Process Vacancies")
      ?.data || [];
  const aftVacData =
    vacanciesDatasets.find((ds) => ds.label === "After Process Vacancies")
      ?.data || [];

  const chartData: ChartData[] = labels.map((window, index) => ({
    window,
    befVac: befVacData[index] || 0,
    aftVac: aftVacData[index] || 0,
    minBid: minBidData[index] || 0,
    medBid: medianBidData[index] || 0,
  }));

  return chartData;
}

async function getChartData(
  moduleCode: string,
  instructor: string,
  term: string,
  section: string,
) {
  const res = await fetch(
    `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/coursedata/sectionbidpriceacrosswindows/${encodeURIComponent(moduleCode)}/${encodeURIComponent(term)}/${encodeURIComponent(instructor)}/${encodeURIComponent(section)}`,
  );
  const data = (await res.json()) as BidOutputData;

  console.log(data);
  const res2 = await fetch(
    `${env.NEXT_PUBLIC_BID_ANALYTICS_API_URL}/coursedata/sectionbidpriceacrosswindows/vacancies/${encodeURIComponent(moduleCode)}/${encodeURIComponent(term)}/${encodeURIComponent(instructor)}/${encodeURIComponent(section)}`,
  );
  const data2 = (await res2.json()) as VacancyOutputData;

  console.log(data2);
  return mergeDatasets(data, data2);
}
export const bitAnalytics = {
  getInstructors,
  getTermsAvailable,
  getSections,
  getChartData,
};
