import { Service } from "../models/services.model"

const data = [
    { name: 'Backend Development', description: '' },
    { name: 'Business Development', description: '' },
    {
        name: 'Copy-writing & translation',
        description: ''
    },
    { name: 'DevOps Engineering', description: '' },
    { name: 'Market Research', description: '' },
    {
        name: 'Mobile App Development',
        description: ''
    },
    { name: 'SaaS Consulting', description: '' },
    { name: 'SEO Audit', description: '' },
    {
        name: 'System Architecture Design',
        description: ''
    },
    { name: 'Testing & Feedback', description: '' },
    { name: 'UI/UX Audit', description: '' },
    { name: 'UI/UX Design', description: '' },
    { name: 'UX Research', description: '' },
    { name: 'Website Development', description: '' }
]

export async function seedService() {
    let index = 0;
    for (const service of data) {
        ++index
        const s = new Service(service);
        await s.save()
        console.log(`Saved: ${index}/${data.length}`)
    }
}