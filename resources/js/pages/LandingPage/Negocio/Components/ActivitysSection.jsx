import React from 'react';
import { Check } from 'lucide-react';

const ActivitysSection = ({ activities }) => {
    if (!activities || activities.length === 0) return null;

    return (
        <section className="bg-brand-ring">
            <div className=" container max-w-7xl mx-auto px-5 ">

                <div className=" p-6 md:p-8">
                    <h2 className="text-6xl font-semibold text-brand-text mb-6 text-white text-center ">Actividades</h2>
                    <div className="flex flex-wrap gap-3">
                        {activities.map((act, index) => (
                            <div
                                key={index}
                                className="flex items-center px-4 py-2 border rounded-full bg-brand-pale text-brand-text text-sm hover:bg-brand-soft hover:text-white transition-colors"
                            >
                                <Check className="w-4 h-4 mr-2" />
                                {act}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ActivitysSection;