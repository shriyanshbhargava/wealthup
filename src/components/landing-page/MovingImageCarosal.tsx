import { CompanySection } from '@/components/CompanySection';
import InfiniteLooper from '@/components/ui/InfiniteLooper';

export const MovingImageCarosal = () => {

    return (
        <div className="max-w-screen-xl flex overflow-hidden mt-8">
            <InfiniteLooper direction='left' speed={20}>
                <CompanySection singleLine moving />
            </InfiniteLooper>
        </div>
    );
};
